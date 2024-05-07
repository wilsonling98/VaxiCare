import { FormGroup } from "@angular/forms";

export const confirmPasswordValidator = (passwordControlName: string, confirmPasswordControlName: string) => {
    return (formGroup: FormGroup) => {
        const passwordControl = formGroup.get(passwordControlName);
        const confirmPasswordControl = formGroup.get(confirmPasswordControlName);
        
        if (!passwordControl || !confirmPasswordControl) {
            // If controls are not found, return null
            return null;
        }
        
        if (confirmPasswordControl.errors && confirmPasswordControl.errors['confirmPasswordValidator']) {
            return;
        }
        
        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ confirmPasswordValidator: true });
        } else {
            confirmPasswordControl.setErrors(null);
        }
    };
};



