import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  redemptionFormSchema,
  schemaOptions
} from '../../server/parsedSchemas/redemption';

import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Heading/TextHeading';
import TextBlock from '../Common/Text/TextBlock';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n.js';

let TCombForm = t.form.Form;

export default class Redemption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    console.log(this.props.validateCodeInfo);
    const { code, updateRoute } = this.props;
    const flag = this.props.isLoggedIn ? true : false;
    let content,
      button,
      statusText = '',
      buttonText = i18n.t('label.redeem_code'),
      successText = '',
      errorText = '',
      actionText = '';
    if (code === null || code === undefined) {
      content = (
        <div className="no-contribution-wrapper">
          {i18n.t('label.enter_code')}
        </div>
      );
      button = (
        <div className="row">
          <PrimaryButton onClick={this.props.validateCode}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </div>
      );
    } else {
      if (!flag) {
        content = (
          <div className="no-contribution-wrapper">
            {i18n.t('label.log_in')}
          </div>
        );
        button = (
          <div className="redemption-form">
            <div className="row">
              <PrimaryButton className="half" onClick={this.props.loginButton}>
                {i18n.t('label.login')}
              </PrimaryButton>
              <PrimaryButton className="half" onClick={this.props.signupButton}>
                {i18n.t('label.signUp')}
              </PrimaryButton>
            </div>
          </div>
        );
      } else {
        if (
          this.props.validateCodeInfo != null &&
          this.props.validateCodeInfo.buttonText != null
        ) {
          buttonText = this.props.validateCodeInfo.buttonText;
        }
        button = (
          <div className="row">
            <PrimaryButton onClick={this.props.setRedemptionCode}>
              {buttonText}
            </PrimaryButton>
          </div>
        );
        if (
          this.props.validateCodeInfo != null &&
          this.props.validateCodeInfo.status === 'success' &&
          this.props.validateCodeInfo.statusText != null
        ) {
          statusText = this.props.validateCodeInfo.statusText;
        }
        if (
          this.props.validateCodeInfo != null &&
          this.props.validateCodeInfo.status === 'success' &&
          this.props.validateCodeInfo.successText != null
        ) {
          successText = this.props.validateCodeInfo.successText;
        }
        if (
          this.props.redemptCodeInfo != null &&
          this.props.redemptCodeInfo.status === 'success' &&
          this.props.redemptCodeInfo.successText != null
        ) {
          successText = this.props.redemptCodeInfo.successText;
          button = '';
        }
        if (
          this.props.validateCodeInfo != null &&
          this.props.validateCodeInfo.status === 'error' &&
          this.props.validateCodeInfo.errorText != null
        ) {
          errorText = this.props.validateCodeInfo.errorText;
        }
        if (
          this.props.validateCodeInfo != null &&
          this.props.validateCodeInfo.actionText != null
        ) {
          actionText = this.props.validateCodeInfo.actionText;
        }
        if (
          this.props.redemptCodeInfo != null &&
          this.props.redemptCodeInfo.actionText != null
        ) {
          actionText = this.props.redemptCodeInfo.actionText;
          button = '';
        }
        if (
          this.props.validateCodeInfo != null &&
          this.props.validateCodeInfo.status === 'error'
        ) {
          button = (
            <div className="row">
              <PrimaryButton onClick={this.props.validateCode}>
                {i18n.t('label.validate_code')}
              </PrimaryButton>
            </div>
          );
        }
        content = (
          <div>
            <div className="no-contribution-wrapper">{actionText}</div>
            <div className="no-contribution-wrapper">{errorText}</div>
            <div className="no-contribution-wrapper">{successText}</div>
            <div className="no-contribution-wrapper">{statusText}</div>
          </div>
        );
      }
    }
    let value = { code: this.props.code };
    let heading;
    if (this.props.path === 'redeem') {
      heading = i18n.t('label.redeem_trees');
    } else if (this.props.path === 'claim') {
      heading = i18n.t('label.claim_trees');
    }
    return (
      <div className="app-container__content--center sidenav-wrapper redemption_container">
        <TextHeading>
          {heading}
          <TextBlock>{i18n.t('label.trillionTreeMessage1')}</TextBlock>
        </TextHeading>
        <CardLayout>
          {content}
          <TCombForm
            ref="redemptionForm"
            type={redemptionFormSchema}
            options={schemaOptions}
            value={value}
          />
          {button}
        </CardLayout>
      </div>
    );
  }
}

Redemption.propTypes = {
  page_status: PropTypes.string,
  validateCodeInfo: PropTypes.func,
  redemptCodeInfo: PropTypes.func,
  code: PropTypes.string,
  isLoggedIn: PropTypes.func,
  updateRoute: PropTypes.func,
  setRedemptionCode: PropTypes.func,
  validateCode: PropTypes.func,
  loginButton: PropTypes.func,
  signupButton: PropTypes.func,
  path: PropTypes.string
};
