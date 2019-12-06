import React, { Component } from "react";
import {
  View,
  Animated,
  Easing,
  StyleProp,
  ViewStyle
} from "react-native";
interface props {
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode | boolean;//自定义左侧内容
  rightIcon?: React.ReactNode | boolean;//自定义右侧内容
  paddingLeft?: number;
  scrollHeight: number;
  data: any; //数据
  onChange?: (index: number) => void;//切换前的函数
  duration?: number;//每一次滚动切换的持续时间
  delay?: number;// 动画延迟时间 (ms)
  enableAnimation?: boolean;//动画开关
  renderItem: (item: any, index: number) => React.ReactNode;//自定义内容
}
interface state {
  scrollHeight: number; // 滚屏高度
  translateValue: Animated.ValueXY;
  content: []; // 滚屏内容
  tempValue: number; // Animated.View 滚动到的 y轴坐标
  contentOffsetY: number; // 最大偏移量
  delay: number; // 动画延迟时间 (ms)
  duration: number; // 每一次滚动切换的持续时间
  enableAnimation: boolean;
}
export default class NoticesBar extends Component<props, state> {
  static defaultProps = {
    enableAnimation: true
  };

  constructor(props: props) {
    super(props);
    this.state = {
      translateValue: new Animated.ValueXY({ x: 0, y: 0 }),
      scrollHeight: this.props.scrollHeight,
      content: [],
      tempValue: 0,
      contentOffsetY: 0,
      delay: props.delay || 3000,
      duration: props.duration || 500,
      enableAnimation: true
    };
  }
  private animation: any = null;
  
  componentWillReceiveProps(nextProps: props) {
    const context = nextProps.data;
    if (context.length !== 0) {
      const h = (context.length + 1) * this.state.scrollHeight;
      this.setState({
        content: context.concat(context[0]),
        contentOffsetY: h
      });
    }
    this.setState(
      {
        enableAnimation: !!nextProps.enableAnimation
      },
      () => {
        this.startAnimation();
      }
    );
  }

  componentDidMount() {
    let content = this.props.data || [];
    if (content.length !== 0) {
      let h = (content.length + 1) * this.state.scrollHeight;
      this.setState({
        content: content.concat(content[0]),
        contentOffsetY: h,
        enableAnimation: !!this.props.enableAnimation
      });

      // 开始动画
      this.startAnimation();
    }
  }
 
  componentWillUnmount() {
    if (this.animation) {
      clearTimeout(this.animation);
    }
  }
  startAnimation = () => {
    if (this.state.enableAnimation) {
      if (!this.animation) {
        this.animation = setTimeout(() => {
          this.animation = null;
          this._startAnimation();
        }, this.state.delay);
      }
    }
  };

  _startAnimation = () => {
    this.setState({
      tempValue: this.state.tempValue - this.state.scrollHeight
    });
    if (this.props.onChange) {
      let index = Math.abs(this.state.tempValue) / this.state.scrollHeight;
      this.props.onChange(index < this.state.content.length - 1 ? index : 0);
    }
    Animated.sequence([
      Animated.timing(this.state.translateValue, {
        isInteraction: false,
        useNativeDriver:true,
        toValue: { x: 0, y: this.state.tempValue },
        duration: this.state.duration, // 动画持续的时间（单位是毫秒），默认为500
        easing: Easing.linear
      })
    ]).start(() => {
      // 无缝切换
      if (
        this.state.tempValue - this.state.scrollHeight <=
        -this.state.contentOffsetY
      ) {
        // 快速拉回到初始状态
        this.state.translateValue.setValue({ x: 0, y: 0 });
        this.setState({
          tempValue: 0
        });
      }
      this.startAnimation();
    });
  };
  render() {
    const {
      containerStyle,
      leftIcon,
      rightIcon,
      paddingLeft,
      renderItem
    } = this.props
    const {
      scrollHeight,
      content,
      translateValue
    } = this.state
    return (
      <View
        style={[
          {
            backgroundColor: "transparent",
            overflow: "hidden",
            flex: 1,
            flexDirection: "row",
            alignContent: "center",
            height: scrollHeight,
          },
          containerStyle
        ]}
      >
        {leftIcon}
        <View
          style={[
            leftIcon ? { paddingLeft: paddingLeft ?paddingLeft:0 } : null,
            {
              flex:1
            }
          ]}
        >
          {content.length !== 0 ? (
            <Animated.View
              style={[
                { flexDirection: "column" },
                {
                  transform: [{ translateY: translateValue.y }]
                }
              ]}
            >
              {content.map((item: any, index: number) =>
                renderItem(item, index)
              )}
            </Animated.View>
          ) : null}
        </View>
         {rightIcon}
      </View>
    );
  }

}


