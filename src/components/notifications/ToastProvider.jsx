import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as RadixToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast";
import { useNotificationStore } from "../../store/useNotificationStore";

export function ToastProvider() {
  const { toasts, removeToast } = useNotificationStore();

  return (
    <RadixToastProvider swipeDirection="right">
      {toasts.map(({ id, title, description, variant, action, ...props }) => (
        <Toast 
          key={id} 
          onOpenChange={(open) => !open && removeToast(id)}
          variant={variant}
          {...props}
        >
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </RadixToastProvider>
  );
}