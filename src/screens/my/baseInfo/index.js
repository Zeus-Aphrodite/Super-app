import React, { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { ListItem, Button, Avatar } from "react-native-elements";
import Theme from "../../../styles/theme";
import Toast from "../../../components/toast";
import userAction from "../../../actions/user";
import { USER_INFO } from "../../../redux/action/userActionTypes";
import { connect, useSelector } from "react-redux";
import I18n from "../../../common/languages";
import commonStyles from "../../../styles/commonStyles";

/**
 * Created by supervons on 2019/08/15.
 * 基本信息页面，可以修改头像及签名.
 * Base info page, user can change avatar and motto.
 */
function BaseInfo() {
  const [userInfo, setUserInfo] = useState([]);
  const [saveButtonShow, setSaveButtonShow] = useState(false);
  const profileInfo = useSelector(state => state.SettingReducer.profileInfo);

  useEffect(() => {
    const userInfoJson = [
      {
        key: "avatar",
        title: I18n.t("BaseInfos.avatar"),
        rightTitle: profileInfo.file_access_path,
        editable: false,
      },
      {
        key: "motto",
        title: I18n.t("BaseInfos.motto"),
        rightTitle: profileInfo.motto,
        editable: false,
      },
      {
        key: "loginId",
        title: I18n.t("BaseInfos.account"),
        rightTitle: global.userInfo.uId,
        editable: false,
      },
      {
        key: "userName",
        title: I18n.t("BaseInfos.name"),
        rightTitle: global.userInfo.userName,
        editable: true,
      },
      {
        key: "userSex",
        title: I18n.t("BaseInfos.sex"),
        rightTitle: global.userInfo.userSex,
        editable: false,
      },
      {
        key: "userCellPhone",
        title: I18n.t("BaseInfos.phone"),
        rightTitle: global.userInfo.userCellphone,
        editable: true,
      },
      {
        key: "userAddress",
        title: I18n.t("BaseInfos.address"),
        rightTitle: global.userInfo.userAddress,
        editable: true,
      },
    ];
    setUserInfo(userInfoJson);
  }, [profileInfo]);
  function changeSaveButtonState(type) {
    // 当保存接口成功调用时，type为true，其余则不更新全局的userInfo
    if (type) {
      setSaveButtonShow(!saveButtonShow);
      props.setUserInfo(userInfo);
    } else {
      setState({
        userInfo: global.userInfo,
        saveButtonShow: !saveButtonShow,
      });
    }
  }

  function updateUserInfo() {
    userAction.updateUserInfo(userInfo).then(resp => {
      Toast.showToast(resp.msg);
      changeSaveButtonState(true);
    });
  }

  function _renderItemView(i, title, rightTitle) {
    return (
      <ListItem bottomDivider key={i}>
        <ListItem.Content
          key={i}
          containerStyle={commonStyles.itemPadding}
          rightTitleStyle={{ width: 170, textAlign: "right" }}
          bottomDivider={true}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <ListItem.Title>{title}</ListItem.Title>
          </View>
          {i === 0 ? (
            <ListItem.Subtitle>
              <Avatar
                rounded
                size="medium"
                source={
                  rightTitle
                    ? { uri: rightTitle }
                    : require("../../../resource/image/avatar/logo.png")
                }
              />
            </ListItem.Subtitle>
          ) : (
            <ListItem.Subtitle>{rightTitle}</ListItem.Subtitle>
          )}
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      {saveButtonShow
        ? global.userInfo.map((item, i) =>
            item.editable ? (
              <ListItem bottomDivider key={i}>
                <ListItem.Content
                  key={i}
                  containerStyle={commonStyles.itemPadding}
                  bottomDivider={true}
                  input={{
                    onChangeText: text =>
                      setState({
                        userInfo: {
                          ...userInfo,
                          [item.key]: text,
                        },
                      }),
                    value: userInfo[item.key],
                    inputStyle: {
                      paddingTop: 0,
                      alignItems: "center",
                      fontSize: 15,
                    },
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </View>
                  <ListItem.Subtitle>{item.rightTitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ) : (
              _renderItemView(i, item.title, item.rightTitle)
            ),
          )
        : userInfo.map((item, i) =>
            _renderItemView(i, item.title, item.rightTitle),
          )}
      {saveButtonShow ? (
        <Button
          icon={{
            name: "save",
            color: "white",
          }}
          buttonStyle={{
            marginTop: 15,
          }}
          title="保存"
          onPress={() => updateUserInfo()}
        />
      ) : null}
    </View>
  );
}

// 取出 store 中的数据
const mapStateToProps = state => {
  return {
    userInfo: state.UserReducer.userInfo,
  };
};

// Dispatch 方法
const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: userInfo => {
      dispatch({ type: USER_INFO, userInfo: userInfo });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfo);
