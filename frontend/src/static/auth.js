import axios from "axios";

export const logInFormData = {
  submitText: "Connexion",
  fields: [
    {
      id: "phone_number",
      name: 'Numéro de téléphone',
      type: "tel",
      options: {
        required: 'Veuillez renseigner votre numéro de téléphone',
        pattern: {
          value: /^((\+)33|0|0033)[1-9](\d{2}){4}$/g,
          message: "Le numéro de téléphone n'est pas valide"
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
    }
  ]
}

export const signInFormData = {
  submitText: "Envoyer",
  fields: [
    {
      id: "first_name",
      name: 'Prénom',
      type: "text",
      options: {
        required: 'Veuillez renseigner votre prénom',
        pattern: {
          value: /^[a-zA-Z]+([ -][a-zA-Z]+)?$/g,
          message: "Le prénom doit être uniquement composé de lettres"
        }
      }
    },
    {
      id: "last_name",
      name: 'Nom',
      type: "text",
      options: {
        required: 'Veuillez renseigner votre nom',
        pattern: {
          value: /^[a-zA-Z]+([ -][a-zA-Z]+)?$/g,
          message: "Le nom doit être uniquement composé de lettres"
        }
      }
    },
    {
      id: "phone_number",
      name: 'Numéro de téléphone',
      type: "tel",
      options: {
        required: 'Veuillez renseigner votre numéro de téléphone',
        pattern: {
          value: /^(?:\+33\s?|0)[1-9]([.|\s|-]?\d{2}){4}$/g,
          message: "Le numéro de téléphone n'est pas valide"
        }
      },
      fetch: async () => {
        const res = axios
          .get('')
          .then(res => res.data)
          .catch(err => err.response)
        return res
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
        },
        pattern: {
          value: /^[0-9]+$/g,
          message: "L'age n'est pas valide"
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