import emailjs from '@emailjs/browser';

/**
 * Universal payload structure sent to the single EmailJS template
 */
export interface UniversalEmailParams {
  form_type: string;
  from_name: string;
  company_name: string;
  from_email: string;
  phone: string;
  subject: string;
  message: string;
  device_specs: string;
  estimated_quantity: string;
  condition_grade: string;
  target_price: string;
  company_reg_number: string;
  vat_number: string;
  business_type: string;
  monthly_purchasing_volume: string;
  quantity_notes: string;
  comments: string;
  [key: string]: unknown;
}

export type EmailParams = UniversalEmailParams;

/**
 * Access EmailJS environment variables from Vite configuration
 */
export const EMAILJS_CONFIG = {
  get serviceId() {
    return import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  },
  get publicKey() {
    return import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
  },
  get templateId() {
    return import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  }
};

/**
 * Helper to construct a clean universal payload.
 * Fills any non-provided or empty field with "N/A".
 */
export const createUniversalPayload = (
  input: Partial<UniversalEmailParams> & {
    form_type: string;
    from_name: string;
    from_email: string;
  }
): UniversalEmailParams => {
  return {
    form_type: input.form_type || 'Website Submission',
    from_name: input.from_name || 'N/A',
    company_name: input.company_name?.trim() || 'N/A',
    from_email: input.from_email || 'N/A',
    phone: input.phone?.trim() || 'N/A',
    subject: input.subject?.trim() || 'N/A',
    message: input.message?.trim() || 'N/A',
    device_specs: input.device_specs?.trim() || 'N/A',
    estimated_quantity: input.estimated_quantity ? String(input.estimated_quantity).trim() : 'N/A',
    condition_grade: input.condition_grade?.trim() || 'N/A',
    target_price: input.target_price?.trim() || 'N/A',
    company_reg_number: input.company_reg_number?.trim() || 'N/A',
    vat_number: input.vat_number?.trim() || 'N/A',
    business_type: input.business_type?.trim() || 'N/A',
    monthly_purchasing_volume: input.monthly_purchasing_volume?.trim() || 'N/A',
    quantity_notes: input.quantity_notes ? String(input.quantity_notes).trim() : 'N/A',
    comments: input.comments?.trim() || 'N/A',
  };
};

/**
 * Sends a form email using the single universal EmailJS template.
 */
export const sendFormEmail = async (
  rawParams: Partial<UniversalEmailParams> & {
    form_type: string;
    from_name: string;
    from_email: string;
  }
): Promise<{ success: boolean; message: string; status?: number }> => {
  const serviceId = EMAILJS_CONFIG.serviceId;
  const publicKey = EMAILJS_CONFIG.publicKey;
  const templateId = EMAILJS_CONFIG.templateId;

  // Build complete payload ensuring all 17 fields exist and default to "N/A"
  const templateParams = createUniversalPayload(rawParams);

  if (!serviceId || !publicKey || !templateId) {
    const missingKeys: string[] = [];
    if (!serviceId) missingKeys.push('VITE_EMAILJS_SERVICE_ID');
    if (!publicKey) missingKeys.push('VITE_EMAILJS_PUBLIC_KEY');
    if (!templateId) missingKeys.push('VITE_EMAILJS_TEMPLATE_ID');

    console.warn(`[EmailJS Notice] Missing configuration keys: ${missingKeys.join(', ')}. Universal Payload:`, templateParams);

    // In local development or before keys are populated, simulate success so UI flows function correctly
    if (import.meta.env.DEV) {
      console.info('[EmailJS Dev Simulation] Universal template submission:', { templateId, templateParams });
      return {
        success: true,
        message: 'Dev Simulation: Universal payload processed successfully. Fill in EmailJS credentials in .env to send real emails.'
      };
    }

    throw new Error(`EmailJS is not fully configured. Missing environment variables: ${missingKeys.join(', ')}`);
  }

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams as Record<string, unknown>,
      publicKey
    );

    console.log('[EmailJS Universal Dispatch Success]', response.status, response.text);
    return {
      success: true,
      message: 'Email dispatched successfully!',
      status: response.status
    };
  } catch (error: any) {
    console.error('[EmailJS Universal Dispatch Error]', error);
    const errorMessage = error?.text || error?.message || 'Failed to dispatch email via EmailJS.';
    throw new Error(errorMessage);
  }
};
