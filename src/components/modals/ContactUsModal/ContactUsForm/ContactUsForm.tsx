import ContactFile from './ContactFile';
import ContactInput from './ContactInput';
import SubmitButton from './SubmitBtn';
import YourNeedsInput from './YourNeedInput';

const ContactUsForm = () => {
  return (
    <form action="">
      <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-8">
        <ContactInput name="First name*" label="First name*" />
        <ContactInput name="last name*" label="last name*" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-8">
        <ContactInput name="Email*" label="Email*" />
        <ContactFile />
      </div>
      <div className="mb-4 md:mb-8">
        <YourNeedsInput />
      </div>
      <SubmitButton />
    </form>
  );
};

export default ContactUsForm;
