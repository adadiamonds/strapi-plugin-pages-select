import React from 'react';
import PropTypes from 'prop-types';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import {Stack } from '@strapi/design-system/Stack';
import { Field, FieldLabel, FieldError, FieldHint } from '@strapi/design-system/Field';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

const PagesSelect = ({
    value,
    onChange,
    name,
    intlLabel,
    labelAction,
    required,
    attribute,
    description,
    placeholder,
    disabled,
    error,
}) => {
    const { formatMessage, messages } = useIntl();
    const parsedOptions = JSON.parse(messages[getTrad('pages')]);
    console.log("0 parsedOptions:", parsedOptions)
    const isValidValue = !value || parsedOptions.hasOwnProperty(value);

    return (
        <Field
            name={name}
            id={name}
            error={!isValidValue ? formatMessage({ id: getTrad('pages-select.unsupported-pages-code') }, { pageCode: value }) : error}
            required={required}
            hint={description && formatMessage(description)}
        >
            <Stack spacing={1}>
                <FieldLabel action={labelAction}>
                    {formatMessage(intlLabel)}
                </FieldLabel>

                <Combobox
                    placeholder={placeholder && formatMessage(placeholder)} 
                    aria-label={formatMessage(intlLabel)}
                    aria-disabled={disabled}
                    disabled={disabled}
                    value={isValidValue ? value : null}
                    onChange={pageCode => onChange({ target: { name, value: pageCode, type: attribute.type }})}
                >
                    {Object.entries(parsedOptions).sort(([c1, n1], [c2, n2]) => n1.localeCompare(n2)).map(([pageCode, pageName]) => (
                        <ComboboxOption value={pageCode} key={pageCode}>{pageName}</ComboboxOption>
                    ))}
                </Combobox>

                <FieldHint />
                <FieldError />
            </Stack>
        </Field>
    )
}

PagesSelect.defaultProps = {
    description: null,
    disabled: false,
    error: null,
    labelAction: null,
    required: false,
    value: '',
};

PagesSelect.propTypes = {
    intlLabel: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    attribute: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    labelAction: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.string,
};

export default PagesSelect;
