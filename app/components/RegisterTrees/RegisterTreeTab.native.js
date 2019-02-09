import React, { PureComponent } from 'react';
import t from 'tcomb-form-native';
import { View } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/register_trees.native';
const Form = t.form.Form;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

getFormLayoutTemplate = (mode, isTpo) => {
  const formLayoutTreesTemplate = locals => {
    return (
      // <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.registerTree__form}>
        <View style={styles.registerTree__form__row}>
          <View style={{ flex: mode === 'multiple-trees' ? 1 : 0 }}>
            {locals.inputs.treeCount}
          </View>
          <View style={{ flex: 1 }}>{locals.inputs.treeSpecies}</View>
        </View>

        {locals.inputs.plantDate}

        {locals.inputs.geoLocation}

        {isTpo ? locals.inputs.plantProject : null}
        <View
          style={[styles.registerTree__form__alignLeftRow, styles.margin_top10]}
        />
        <View style={styles.registerTree__form__row}>
          <View style={{ flex: 1 }}>{locals.inputs.treeClassification}</View>
          <View style={{ flex: 1 }}>{locals.inputs.treeScientificName}</View>
        </View>
        <View style={styles.registerTree__form__row__split}>
          {locals.inputs.contributionMeasurements}
        </View>
      </View>
      // </KeyboardAwareScrollView>
    );
  };
  return formLayoutTreesTemplate;
};

export default class RegisterTreeTab extends PureComponent {
  render() {
    //console.log('locals', this.props);
    const schemaOptionsMultiple = {
      template: getFormLayoutTemplate(this.props.mode, this.props.isTpo),
      ...this.props.schemaOptions
    };
    return (
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#ffffff' }}>
          <Form
            ref="multipleTreesForm"
            type={this.props.schemaType}
            options={schemaOptionsMultiple}
            value={this.props.value ? this.props.value : { treeCount: 1 }}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onRegister &&
                this.props.onRegister(
                  this.props.mode,
                  this.refs.multipleTreesForm
                );
            }}
          >
            {this.props.buttonTitle
              ? this.props.buttonTitle
              : i18n.t('label.register')}
          </PrimaryButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

RegisterTreeTab.propTypes = {
  mode: PropTypes.string.isRequired,
  onRegister: PropTypes.func,
  schemaType: PropTypes.any.isRequired,
  schemaOptions: PropTypes.any.isRequired,
  value: PropTypes.any,
  buttonTitle: PropTypes.string,
  isTpo: PropTypes.bool
};
