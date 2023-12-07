import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Form from '../../components/Form';
import { logInFormData, signInFormData } from '../../static/auth';
import { faker } from '@faker-js/faker';
import { act } from 'react-dom/test-utils';

describe("Log In Form Test", () => {
  it("should return an errors if a required fields is missing", async () => {
    const { getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={logInFormData}
      />
    );
    const submitButton = getByText('Connexion');

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const phoneNumberError = getByText('Veuillez renseigner votre numéro de téléphone');
      const passwordError = getByText('Veuillez renseigner votre mot de passe');

      expect(phoneNumberError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  it("should return an error if phone number is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={logInFormData}
      />
    );
    const submitButton = getByText('Connexion');

    const phoneNumberInput = getByLabelText('Numéro de téléphone');
    const invalidPhoneNumber = [
      {
        value: faker.string.symbol(5),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: faker.person.firstName(),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: faker.phone.number(),
        error: "Le numéro de téléphone n'est pas valide"
      }
    ]

    for (const { value, error } of invalidPhoneNumber) {
      await act(async () => {
        await fireEvent.input(phoneNumberInput, { target: { value } });
        await fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  it("should not return an error if phone number is valid", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={logInFormData}
      />
    );
    const submitButton = getByText('Connexion');

    const phoneNumberInput = getByLabelText('Numéro de téléphone');
    const validPhoneNumber = [
      {
        value: "0" + faker.string.numeric({ length: 9, exclude: ['0'] }),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: "+33" + faker.string.numeric({ length: 9, exclude: ['0'] }),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: ("0" + faker.string.numeric({ length: 9, exclude: ['0'] })).match(/.{2}/g).join(' '),
        error: "Le numéro de téléphone n'est pas valide"
      }
    ]

    for (const { value, error } of validPhoneNumber) {
      await act(async () => {
        await fireEvent.input(phoneNumberInput, { target: { value } });
        await fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(queryByText(error)).toBeNull();
      });
    }
  });

  it("should submit the form if fields are valid", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={logInFormData}
      />
    );
    const submitButton = getByText('Connexion');
    const inputs = [
      { label: "Numéro de téléphone", value: "+33614847494", error: "Le numéro de téléphone n'est pas valide" },
      { label: "Mot de passe", value: "motdepasse", error: 'Veuillez renseigner votre mot de passe' }
    ];

    for (const { label, value, error } of inputs) {
      await act(async () => {
        await fireEvent.input(getByLabelText(label), { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(queryByText(error)).toBeNull();
      });
    };
  });
});

describe("Sign In Form Test", () => {
  it("should return errors if required fields is missing", async () => {
    const { getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const firstNameError = getByText('Veuillez renseigner votre prénom');
      const lastNameError = getByText('Veuillez renseigner votre nom');
      const phoneNumberError = getByText('Veuillez renseigner votre numéro de téléphone');
      const ageError = getByText('Veuillez renseigner votre âge');
      const passwordError = getByText('Veuillez renseigner votre mot de passe');

      expect(firstNameError).toBeInTheDocument();
      expect(lastNameError).toBeInTheDocument();
      expect(phoneNumberError).toBeInTheDocument();
      expect(ageError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  it("should return an errors if first name is invalid format", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const firstNameInput = getByLabelText('Prénom');

    const invalidFirstName = [
      {
        value: faker.string.binary({ length: 6 }),
        error: 'Le prénom doit être uniquement composé de lettres'
      },
      {
        value: faker.string.symbol(5),
        error: 'Le prénom doit être uniquement composé de lettres'
      }
    ]

    for (const { value, error } of invalidFirstName) {
      await act(async () => {
        await fireEvent.input(firstNameInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  it("should not return an error if first name is valid", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const firstNameInput = getByLabelText('Prénom');

    const validFirstName = [
      {
        value: faker.person.firstName(),
        error: 'Le prénom doit être uniquement composé de lettres'
      },
      {
        value: faker.string.alpha(10),
        error: 'Le prénom doit être uniquement composé de lettres'
      }
    ]

    for (const { value, error } of validFirstName) {
      await act(async () => {
        await fireEvent.input(firstNameInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(queryByText(error)).toBeNull();
      });
    }
  });

  it("should return an errors if last name is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const lastNameInput = getByLabelText('Nom');
    const invalidLastName = [
      {
        value: faker.string.binary({ length: 6 }),
        error: 'Le nom doit être uniquement composé de lettres'
      },
      {
        value: faker.string.symbol(5),
        error: 'Le nom doit être uniquement composé de lettres'
      }
    ]

    for (const { value, error } of invalidLastName) {
      await act(async () => {
        await fireEvent.input(lastNameInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  it("should not return an error if last name is valid", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const lastNameInput = getByLabelText('Nom');
    const validLastName = [
      {
        value: faker.person.lastName(),
        error: 'Le nom doit être uniquement composé de lettres'
      },
      {
        value: faker.string.alpha(10),
        error: 'Le nom doit être uniquement composé de lettres'
      }
    ]

    for (const { value, error } of validLastName) {
      await act(async () => {
        await fireEvent.input(lastNameInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(queryByText(error)).toBeNull();
      });
    }
  });

  it("should return an errors if phone number is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");
    const phoneNumberInput = getByLabelText('Numéro de téléphone');

    const invalidPhoneNumber = [
      {
        value: faker.string.symbol(5),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: faker.person.firstName(),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: faker.phone.number(),
        error: "Le numéro de téléphone n'est pas valide"
      }
    ]

    for (const { value, error } of invalidPhoneNumber) {
      await act(async () => {
        await fireEvent.input(phoneNumberInput, { target: { value } });
        await fireEvent.click(submitButton);
      });
      
      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  it("should not return an error if phone number is valid", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");

    const phoneNumberInput = getByLabelText('Numéro de téléphone');
    const validPhoneNumber = [
      {
        value: "0" + faker.string.numeric({ length: 9, exclude: ['0'] }),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: "+33" + faker.string.numeric({ length: 9, exclude: ['0'] }),
        error: "Le numéro de téléphone n'est pas valide"
      },
      {
        value: ("0" + faker.string.numeric({ length: 9, exclude: ['0'] })).match(/.{2}/g).join(' '),
        error: "Le numéro de téléphone n'est pas valide"
      }
    ]

    for (const { value, error } of validPhoneNumber) {
      await act(async () => {
        await fireEvent.input(phoneNumberInput, { target: { value } });
        await fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(queryByText(error)).toBeNull();
      });
    }
  });

  it("should return an errors if invalid age is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");

    const ageInput = getByLabelText('Âge');
    const invalidAge = [
      {
        value: faker.number.int({ min: -10000, max: 17 }),
        error: 'Vous devez avoir au minimum 18 ans'
      },
      {
        value: faker.number.int({ min: 151, max: 10000 }),
        error: 'Vous ne pouvez pas avoir plus de 150 ans'
      },
      {
        value: faker.word.words(),
        error: "L'age n'est pas valide"
      },
    ]

    for (const { value, error } of invalidAge) {
      await act(async () => {
        await fireEvent.input(ageInput, { target: { value } });
        await fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(getByText(error)).toBeInTheDocument();
      });
    }
  });

  it("should not return an error if valid age is valid", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={signInFormData}
      />
    );
    const submitButton = getByText("S'inscrire");

    const ageInput = getByLabelText('Âge');
    const validAge = {
      value: faker.number.int({ min: 18, max: 150 }),
      errors: [
        {
          message: 'Vous devez avoir au minimum 18 ans'
        },
        {
          message: 'Vous ne pouvez pas avoir plus de 150 ans'
        },
        {
          message: "L'age n'est pas valide"
        }
      ]
    }

    await act(async () => {
      await fireEvent.input(ageInput, { target: { value: validAge.value } });
      await fireEvent.click(submitButton);
    });
    
    for (const { message } of validAge.errors) {
      await waitFor(() => {
        expect(queryByText(message)).toBeNull();
      });
    }
  });
});