import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Mail, Phone, Building } from 'lucide-react';
import { z } from 'zod';

const leadSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.string().optional(),
  oid: z.string(),
  retURL: z.string(),
  lead_source: z.string(),
});

type LeadFormData = z.infer<typeof leadSchema>;

const WebToLeadForm = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formState, setFormState] = useState<LeadFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    oid: '00D5i00000EXAMPLE', // Replace with your Salesforce Organization ID
    retURL: window.location.origin + '/thank-you',
    lead_source: 'Web'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof LeadFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = leadSchema.parse(formState);

      // Submit to Salesforce Web-to-Lead endpoint
      const form = e.target as HTMLFormElement;
      form.submit();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<Record<keyof LeadFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof LeadFormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto"
    >
      <form 
        onSubmit={handleSubmit}
        action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
        method="POST"
        className="space-y-6"
      >
        {/* Hidden fields */}
        <input type="hidden" name="oid" value={formState.oid} />
        <input type="hidden" name="retURL" value={formState.retURL} />
        <input type="hidden" name="lead_source" value={formState.lead_source} />

        {/* First Name */}
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-300 mb-1">
            First Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formState.first_name}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.first_name ? 'border-error-500' : 'border-gray-700'
              } rounded-lg bg-gray-800 focus:ring-primary-500 focus:border-primary-500 text-white`}
              placeholder="John"
              required
            />
          </div>
          {errors.first_name && (
            <p className="mt-1 text-sm text-error-400">{errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-1">
            Last Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formState.last_name}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.last_name ? 'border-error-500' : 'border-gray-700'
              } rounded-lg bg-gray-800 focus:ring-primary-500 focus:border-primary-500 text-white`}
              placeholder="Doe"
              required
            />
          </div>
          {errors.last_name && (
            <p className="mt-1 text-sm text-error-400">{errors.last_name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.email ? 'border-error-500' : 'border-gray-700'
              } rounded-lg bg-gray-800 focus:ring-primary-500 focus:border-primary-500 text-white`}
              placeholder="john@example.com"
              required
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-error-400">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-3 border ${
                errors.phone ? 'border-error-500' : 'border-gray-700'
              } rounded-lg bg-gray-800 focus:ring-primary-500 focus:border-primary-500 text-white`}
              placeholder="(555) 123-4567"
              required
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-error-400">{errors.phone}</p>
          )}
        </div>

        {/* Company (Optional) */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
            Company (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="company"
              name="company"
              value={formState.company}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 focus:ring-primary-500 focus:border-primary-500 text-white"
              placeholder="Your Company"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center"
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default WebToLeadForm;