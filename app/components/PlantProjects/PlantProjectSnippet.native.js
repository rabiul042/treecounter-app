import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';

import { getImageUrl } from '../../actions/apiRouting';
import { tick, location_grey, survival_grey, tax_grey } from '../../assets';
import i18n from '../../locales/i18n';
import styles from '../../styles/selectplantproject/selectplantproject-snippet.native';
import { formatNumber } from '../../utils/utils';
import { getISOToCountryName } from '../../helpers/utils';
import CardLayout from '../Common/Card';
import PlantedProgressBar from './PlantedProgressbar.native';

import Icon from 'react-native-vector-icons/FontAwesome';
//keeping Icon here instead of in assets
const starIcon = <Icon name="star" size={14} color="#4d5153" />;

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectSnippet extends PureComponent {
  // toggleExpanded(id) {
  //   this.props.onMoreClick(id);
  // }
  containerPress = () => {
    if (this.props.onMoreClick) {
      const { id, name } = this.props.plantProject;
      this.props.onMoreClick(id, name);
    }
  };

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      id,
      name: projectName,
      isCertified,
      plantProjectImages,
      location,
      country,
      countPlanted,
      countTarget,
      currency,
      treeCost,
      paymentSetup,
      survivalRate,
      // images,
      imageFile,
      reviewScore: plantProjectRating,
      reviews
      // description,
      // homepageUrl: homepageUrl,
      // homepageCaption: homepageCaption,
      // videoUrl: videoUrl,
      // geoLocation
    } = this.props.plantProject;
    let projectImage = null;
    // let treePlantedRatio = (countPlanted / countTarget).toFixed(2);
    // treePlantedRatio = parseFloat(treePlantedRatio);
    // let treeCountWidth;
    // if (treePlantedRatio > 1) {
    //   treeCountWidth = 100;
    // } else if (treePlantedRatio < 0) {
    //   treeCountWidth = 0;
    // } else {
    //   treeCountWidth = treePlantedRatio * 100;
    // }

    if (imageFile) {
      projectImage = { image: imageFile };
    } else {
      projectImage = plantProjectImages && plantProjectImages.find(() => true);
    }

    const teaserProps = {
      tpoName: this.props.tpoName,
      projectName,
      isCertified,
      projectImage
    };
    const specsProps = {
      location,
      countPlanted,
      countTarget,
      survivalRate,
      currency,
      treeCost,
      taxDeduction: paymentSetup.taxDeduction
    };
    let deducibleText1 = '';
    // let tooltipText1 = '';
    for (let i = 0; i < specsProps.taxDeduction.length; i++) {
      deducibleText1 += specsProps.taxDeduction[i];
      if (i == specsProps.taxDeduction.length - 1) {
        deducibleText1 += '.';
      } else {
        deducibleText1 += ', ';
      }
    }
    let onPressHandler = this.props.clickable ? this.containerPress : undefined;
    const textColor = '#4d5153';
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={onPressHandler}
      >
        <CardLayout style={[styles.projectSnippetContainer]} withoutShadow>
          {projectImage ? (
            <View style={styles.projectImageContainer}>
              <Image
                style={styles.teaser__projectImage}
                source={{
                  uri: getImageUrl(
                    'project',
                    'large',
                    teaserProps.projectImage.image
                  )
                }}
                resizeMode={'cover'}
              />
              {reviews && reviews.length ? (
                <View style={[styles.certifiedAndRatingContainer]}>
                  {teaserProps.isCertified ? (
                    <Image
                      source={tick}
                      style={{
                        width: 15,
                        height: 15,
                        marginLeft: 2,
                        marginRight: 3
                      }}
                    />
                  ) : null}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={[
                        {
                          fontSize: 14,
                          // lineHeight: 19,
                          color: { textColor },
                          textAlign: 'center',
                          marginRight: 5,
                          marginLeft: 2
                        }
                      ]}
                    >
                      {(plantProjectRating / 100).toFixed(2) || '0.0'}
                    </Text>
                    {starIcon}
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}
          <PlantedProgressBar
            countPlanted={specsProps.countPlanted}
            countTarget={specsProps.countTarget}
            style={{ borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}
            treePlantedChildContainerStyle={{ borderBottomLeftRadius: 7 }}
          />
          <View style={styles.projectSpecsContainer}>
            <View
              key="projectNameContainer"
              style={styles.projectNameContainer}
            >
              <Text
                ellipsizeMode="tail"
                style={styles.project_teaser__contentText}
              >
                {`${teaserProps.projectName}  ${
                  teaserProps.tpoName ? 'by ' + teaserProps.tpoName : ''
                }`}
              </Text>
            </View>
            <View
              key="projectdetailsContainer"
              style={styles.projectdetailsContainer}
            >
              <View style={styles.locationContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={location_grey}
                    style={{
                      width: 17,
                      height: 17,
                      marginRight: 10
                    }}
                  />
                  <Text style={styles.survivalText} ellipsizeMode="tail">
                    {getISOToCountryName(country).country}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Image
                    source={survival_grey}
                    style={{
                      width: 17,
                      height: 17,
                      marginRight: 10
                    }}
                  />
                  <Text style={styles.survivalText}>
                    {specsProps.survivalRate}% {i18n.t('label.survival_rate')}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image
                      source={tax_grey}
                      style={{
                        width: 17,
                        height: 17,
                        marginRight: 10
                      }}
                    />
                    <Text style={styles.survivalText}>
                      {specsProps.taxDeduction && specsProps.taxDeduction.length
                        ? `${i18n.t('label.tax_deductible')} ${i18n.t(
                            'label.in'
                          )} ${deducibleText1}`
                        : i18n.t('label.no_tax_deduction')}
                    </Text>
                  </View>

                  {/* <ReactNativeTooltipMenu
                      buttonComponent={
                        <Image
                          style={styles.project_specs__taxdeductibleIcon}
                          source={questionmark_orange}
                        />
                      }
                      items={[{ label: tooltipText1, onPress: () => {} }]}
                    /> */}
                </View>
              </View>

              <View style={styles.costContainer}>
                <View style={styles.costTextContainer}>
                  <Text
                    style={[styles.costText]}
                    onPress={() =>
                      this.props.onSelectClickedFeaturedProjects(id)
                    }
                  >
                    {formatNumber(specsProps.treeCost, null, currency)}
                  </Text>
                </View>

                <Text style={[styles.costPerTreeText]}>
                  {i18n.t('label.cost_per_tree')}
                </Text>
              </View>
            </View>

            <View key="actionContainer" style={styles.actionContainer}>
              {/* <View key="byOrgContainer" style={styles.byOrgContainer}>
                <Text
                  style={styles.byOrgText}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {teaserProps.tpoName}
                </Text>
              </View> */}

              {/* {this.props.plantProject.allowDonations ? (
                <View key="buttonContainer" style={styles.buttonContainer}>
                  <PrimaryButton
                    style={styles.buttonItem}
                    buttonStyle={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    onClick={() =>
                      this.props.onSelectClickedFeaturedProjects(id)
                    }
                  >
                    <Text> {i18n.t('label.donate')}</Text>
                  </PrimaryButton>
                </View>
              ) : null} */}
            </View>
          </View>
        </CardLayout>
      </TouchableHighlight>
    );
  }
}
PlantProjectSnippet.defaultProps = { clickable: true, showCertifiedTag: true };
PlantProjectSnippet.propTypes = {
  plantProject: PropTypes.object.isRequired,
  callExpanded: PropTypes.func,
  tpoName: PropTypes.string,
  selectAnotherProject: PropTypes.bool,
  projectClear: PropTypes.func,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  onMoreClick: PropTypes.func,
  onSelectClickedFeaturedProjects: PropTypes.func,
  clickable: PropTypes.bool,
  showCertifiedTag: PropTypes.bool,
  selectProject: PropTypes.func
};

export default PlantProjectSnippet;
