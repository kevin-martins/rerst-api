export const signInFormData = {
  submitText: "Envoyer",
  fields: [
    {
      id: "first_name",
      name: 'Prenom',
      type: "text",
      options: {
        required: 'Veuillez renseigner votre prenom',
      }
    },
    {
      id: "last_name",
      name: 'Nom',
      type: "text",
      options: {
        required: 'Veuillez renseigner votre nom',
      }
    },
    {
      id: "phone_number",
      name: 'Numéro de téléphone',
      type: "text",
      options: {
        required: 'Veuillez renseigner votre numéro de téléphone',
      }
    },
    {
      id: "age",
      name: 'Age',
      type: "text",
      options: {
        required: 'Veuillez renseigner votre age',
        min: {
          value: 18,
          message: 'Vous devez avoir au minimum 18 ans'
        },
        max: {
          value: 150,
          message: 'Vous ne pouvez pas avoir plus de 150 ans'
        }
      }
    },
    {
      id: "password",
      name: 'Mot de passe',
      type: "password",
      options: {
        required: 'Veuillez renseigner votre mot de passe',
      },
    },
    {
      id: "password_confirmation",
      name: 'Confirmez votre mot de passe',
      type: "password",
      options: {
        required: 'Veuillez confirmer votre mot de passe',
      },
      watch: (watch) => {
        const password = watch("password");
        const copy = watch("password_confirmation")
        if (password === copy && copy?.length > 5) {
          return 'border-green-500';
        }
      }
    }
  ]
}