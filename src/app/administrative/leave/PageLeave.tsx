import React from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import dayjs, { Dayjs } from 'dayjs';

import { Page, PageContent } from '@/app/layout';
import { FieldDayPicker, FieldInput, FieldRadios } from '@/components';
import { getDaysBetweenTwoDays } from '@/utils/getDaysBetweenTwoDays';

import {
  buildCraUrl,
  buildGoogleAgendaUrl,
  buildGoogleFormUrl,
} from './leave.functions';
import {
  CRA_FORM_ENTRIES_DATE_DAY,
  CRA_FORM_ENTRIES_DATE_MONTH,
  CRA_FORM_ENTRIES_DATE_YEAR,
  CRA_FORM_ENTRIES_PROJECT_1_CODE,
  CRA_FORM_ENTRIES_PROJECT_1_TIME,
  LeaveAppFormValues,
  LeaveGoogleFormValues,
  LEAVE_FORM_ENTRIES_DATE_BEGIN,
  LEAVE_FORM_ENTRIES_DATE_BEGIN_DAY,
  LEAVE_FORM_ENTRIES_DATE_BEGIN_MONTH,
  LEAVE_FORM_ENTRIES_DATE_BEGIN_YEAR,
  LEAVE_FORM_ENTRIES_DATE_END,
  LEAVE_FORM_ENTRIES_DATE_END_DAY,
  LEAVE_FORM_ENTRIES_DATE_END_MONTH,
  LEAVE_FORM_ENTRIES_DATE_END_YEAR,
  LEAVE_FORM_ENTRIES_FIRST_NAME,
  LEAVE_FORM_ENTRIES_LAST_NAME,
  LEAVE_FORM_ENTRIES_TYPE,
  LEAVE_FORM_ENTRIES_TYPE_OPTIONS,
} from './leave.types';

export const PageLeave = () => {
  const handleSubmit = (values: LeaveAppFormValues) => {
    const {
      [LEAVE_FORM_ENTRIES_DATE_BEGIN]: beginDate,
      [LEAVE_FORM_ENTRIES_DATE_END]: endDate,
      ...formRest
    } = values;

    const formatedValues: LeaveGoogleFormValues = {
      ...formRest,
      [LEAVE_FORM_ENTRIES_DATE_BEGIN_DAY]: beginDate.get('date'),
      [LEAVE_FORM_ENTRIES_DATE_BEGIN_MONTH]: beginDate.get('month') + 1,
      [LEAVE_FORM_ENTRIES_DATE_BEGIN_YEAR]: beginDate.get('year'),
      [LEAVE_FORM_ENTRIES_DATE_END_DAY]: endDate.get('date'),
      [LEAVE_FORM_ENTRIES_DATE_END_MONTH]: endDate.get('month') + 1,
      [LEAVE_FORM_ENTRIES_DATE_END_YEAR]: endDate.get('year'),
    };

    const formatedCraValues = (day: Dayjs) => ({
      ...formRest,
      [CRA_FORM_ENTRIES_DATE_DAY]: day.get('date'),
      [CRA_FORM_ENTRIES_DATE_MONTH]: day.get('month') + 1,
      [CRA_FORM_ENTRIES_DATE_YEAR]: day.get('year'),
      [CRA_FORM_ENTRIES_PROJECT_1_CODE]: 'congés-absent',
      [CRA_FORM_ENTRIES_PROJECT_1_TIME]:
        values?.[LEAVE_FORM_ENTRIES_TYPE] === 'Toute la journée' ? '7' : '3',
    });

    getDaysBetweenTwoDays(beginDate, endDate)
      ?.filter((day) => day.day() !== 0 && day.day() !== 6)
      ?.forEach((day) => {
        window.open(buildCraUrl(formatedCraValues(day)), '_blank');
      });

    window.open(buildGoogleFormUrl(formatedValues), '_blank');
    window.open(buildGoogleAgendaUrl(values), '_blank');
  };

  const form = useForm();

  return (
    <Page containerSize="full">
      <PageContent>
        <Formiz autoForm connect={form} onValidSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction="row">
              <FieldInput
                placeholder={'lastName'}
                name={LEAVE_FORM_ENTRIES_LAST_NAME}
                label="Nom"
                required="Le nom est requis"
                defaultValue={localStorage.getItem('leave-lastName')}
                onChange={(value) =>
                  localStorage.setItem('leave-lastName', value)
                }
              />
              <FieldInput
                placeholder={'firstName'}
                name={LEAVE_FORM_ENTRIES_FIRST_NAME}
                label="Prénom"
                required="Le prénom est requis"
                defaultValue={localStorage.getItem('leave-firstName')}
                onChange={(value) =>
                  localStorage.setItem('leave-firstName', value)
                }
              />
            </Stack>
            <Stack direction="row">
              <FieldDayPicker
                name={LEAVE_FORM_ENTRIES_DATE_BEGIN}
                label="Date de début"
                required="La date de début est requise"
              />
              <FieldDayPicker
                name={LEAVE_FORM_ENTRIES_DATE_END}
                label="Date de fin"
                required="La date de fin est requise"
                validations={[
                  {
                    rule: (value) =>
                      dayjs(value)?.isSameOrAfter(
                        form?.values?.[LEAVE_FORM_ENTRIES_DATE_BEGIN]
                      ),
                    message: 'La date de fin doit être après la date de début',
                    deps: [form?.values?.[LEAVE_FORM_ENTRIES_DATE_BEGIN]],
                  },
                ]}
              />
            </Stack>
            <FieldRadios
              name={LEAVE_FORM_ENTRIES_TYPE}
              options={LEAVE_FORM_ENTRIES_TYPE_OPTIONS}
              required="Le type est requis"
            />
            <Button type="submit" variant="@primary">
              Valider
            </Button>
          </Stack>
        </Formiz>
      </PageContent>
    </Page>
  );
};
