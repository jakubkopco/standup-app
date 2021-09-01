import { forwardRef } from 'react';

import { Stack, StackProps } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';

import { useCurrentUser } from '@/app/auth/useAuth';
import { Page, PageContent } from '@/app/layout';
import { FieldInput } from '@/components/FieldInput';
import { FieldTextarea } from '@/components/FieldTextarea';

interface GoalFormProps extends StackProps {}

export const PageExpensesReport = forwardRef<HTMLElement, GoalFormProps>(() => {
  const currentUser = useCurrentUser();

  return (
    <Page containerSize="full">
      <PageContent>
        <Formiz
          autoForm
          onValidSubmit={() => {}}
          initialValues={{
            name: currentUser.username,
          }}
        >
          <Stack spacing={3}>
            <FieldInput
              name="name"
              label="Nom"
              placeholder="Votre nom et prénom"
              required="Votre nom est requis"
              isDisabled
            />
            <FieldInput
              name="month"
              label="Mois de remboursement"
              placeholder="Saisir le mois de remboursement de la note de frais"
              required="Votre nom est requis"
            />
            <FieldTextarea
              name="description"
              label="Description"
              placeholder="Saisir la description de l'objectif"
              required="La description est requise"
            />
          </Stack>
        </Formiz>
      </PageContent>
    </Page>
  );
});
