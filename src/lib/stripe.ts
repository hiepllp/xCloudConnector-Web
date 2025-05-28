import { supabase } from './supabase';
import { products } from '../stripe-config';

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription', quantity: number = 1) {
  const { origin } = window.location;
  const success_url = `${origin}/checkout/success`;
  const cancel_url = `${origin}/checkout/cancel`;

  try {
    // Get the current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      throw new Error('Failed to authenticate user. Please try signing in again.');
    }

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url,
        mode,
        quantity,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    if (!data.url) {
      throw new Error('No checkout URL received');
    }

    window.location.href = data.url;
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    throw new Error(`Checkout failed: ${error.message}`);
  }
}

export function getProductByPriceId(priceId: string) {
  return Object.values(products).find((product) => product.priceId === priceId);
}