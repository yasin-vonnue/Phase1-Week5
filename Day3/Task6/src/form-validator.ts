type Rule<T = unknown> = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  custom?: (v: T) => string | null;
};

class FormValidator<T extends object> {
  private form: HTMLFormElement;
  private rules: {
    [K in keyof T]?: Rule<T[K]>[];
  };

  public constructor(
    form: HTMLFormElement,
    rules: { [K in keyof T]?: Rule<T[K]>[] },
  ) {
    this.form = form;
    this.rules = rules;
  }

  public validate(): {
    valid: boolean;
    errors: Partial<Record<keyof T, string>>;
  } {
    const errors: Partial<Record<keyof T, string>> = {};

    for (const key of Object.keys(this.rules) as Array<keyof T>) {
      const fieldRules = this.rules[key];

      if (!fieldRules) {
        continue;
      }

      const input = this.form.elements.namedItem(String(key));

      if (!(input instanceof HTMLInputElement)) {
        continue;
      }

      const value = input.value as T[typeof key];

      for (const rule of fieldRules) {
        const stringValue = String(value);

        if (rule.required && stringValue.trim() === "") {
          errors[key] = "This field is required";
          break;
        }

        if (
          rule.minLength !== undefined &&
          stringValue.length < rule.minLength
        ) {
          errors[key] = `Minimum length is ${rule.minLength}`;
          break;
        }

        if (rule.pattern && !rule.pattern.test(stringValue)) {
          errors[key] = "Invalid format";
          break;
        }

        if (rule.custom) {
          const error = rule.custom(value);

          if (error !== null) {
            errors[key] = error;
            break;
          }
        }
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

// Example form type

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

// Example usage

const form = document.querySelector("#loginForm");

if (!(form instanceof HTMLFormElement)) {
  throw new Error("Login form not found");
}

const validator = new FormValidator<LoginForm>(form, {
  username: [
    {
      required: true,
      minLength: 3,
    },
  ],

  email: [
    {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  ],

  password: [
    {
      required: true,
      minLength: 8,
      custom: (value) => {
        if (!/[A-Z]/.test(value)) {
          return "Password must contain an uppercase letter";
        }

        return null;
      },
    },
  ],
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const result = validator.validate();

  console.log("Valid:", result.valid);
  console.log("Errors:", result.errors);
});
