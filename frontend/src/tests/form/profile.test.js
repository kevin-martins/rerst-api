import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Form from '../../components/Form';
import { profileFormData } from '../../static/profile';
import { faker } from '@faker-js/faker';
import { act } from 'react-dom/test-utils';

describe("Profile Form Test", () => {
  it("should return an errors if a required field is missing", async () => {
    const { getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={profileFormData}
      />
    );
    const submitButton = getByText('Envoyer');
    await act(async () => {
      await fireEvent.click(submitButton);
    });
    
    await waitFor(() => {
      const firstNameError = getByText('Veuillez renseigner votre prénom');
      const lastNameError = getByText('Veuillez renseigner votre nom');
      const phoneNumberError = getByText('Veuillez renseigner votre numéro de téléphone');
      const ageError = getByText('Veuillez renseigner votre âge');

      expect(firstNameError).toBeInTheDocument();
      expect(lastNameError).toBeInTheDocument();
      expect(phoneNumberError).toBeInTheDocument();
      expect(ageError).toBeInTheDocument();
    });
  });

  it("should return an errors if age is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={profileFormData}
      />
    );
    const submitButton = getByText('Envoyer');
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

  it("should return an errors if first name is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={profileFormData}
      />
    );
    const submitButton = getByText('Envoyer');
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

  it("should return an errors if last name is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={profileFormData}
      />
    );
    const submitButton = getByText('Envoyer');
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

  it("should return an errors if phone number is invalid", async () => {
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={profileFormData}
      />
    );
    const submitButton = getByText('Envoyer');
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

  it("should submit the form if fields are valid", async () => {
    const { queryByText, getByLabelText, getByText } = render(
      <Form
        onSubmit={() => { }}
        formData={profileFormData}
      />
    );
    const submitButton = getByText('Envoyer');
    const inputs = [
      { label: "Prénom", value: "Kevin", error: "Veuillez renseigner votre prénom" },
      { label: "Nom", value: "Martins", error: "Veuillez renseigner votre nom" },
      { label: "Âge", value: 25, error: "Veuillez renseigner votre âge" },
      { label: "Numéro de téléphone", value: "+33614547489", error: "Le numéro de téléphone n'est pas valide" },
      { label: "", value: "" }
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