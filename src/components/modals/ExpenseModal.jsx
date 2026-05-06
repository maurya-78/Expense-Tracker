import BaseModal from "./BaseModal";
import ExpenseForm from "../forms/ExpenseForm";

const ExpenseModal = ({ isOpen, onClose, mode = "create", initialData }) => {
  const handleSubmit = (data) => {
    console.log("Submitting Expense:", data);
    // Add logic for API call here
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Add New Expense" : "Edit Expense"}
      description="Enter the details of your transaction. Make sure to attach a receipt for compliance."
      className="sm:max-w-[700px]"
    >
      <ExpenseForm 
        onSubmit={handleSubmit} 
        initialData={initialData} 
        onCancel={onClose}
      />
    </BaseModal>
  );
};

export default ExpenseModal;