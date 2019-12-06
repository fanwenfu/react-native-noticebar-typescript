# react-native-noticebar-typescript
## React Native NoticeBar 竖向滚动通知栏、公告栏

### install 使用
```npm
$ npm i react-native-noticebar-typescript
```
```yarn
$ yarn add react-native-noticebar-typescript
```

# Usage

```
import NoticeBar from 'react-native-noticebar-typescript'

class Demo extends Component<props, state> {
  constructor(props) {
    super(props)
    this.state = {
      noticeList: [
        {
          id: 1,
          title: '张三！！！'
        },
        {
          id: 2,
          title: '李四！！！'
        }
      ]
    }
  }

  // noticebar change event
  onChange = (index) => {
    console.log(`Current index is ${index}.` )
  }

  // render item
  renderItem = (item:any, index:number) => {
    return (
      <View>
        <Text numberOfLines={1}>{item.title}</Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        <NoticesBar
          data={noticeList}
          delay={3000}
          duration={500}
          scrollHeight={28}
          onChange={this.onChange.bind(this)}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    )
  }
}
```

# Props

<table>
    <tr>
        <th>Prop</th>
        <th>Default</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>data</td>
        <td>require</td>
        <td>{ items: any[] }[]</td>
        <td>the data list</td>
    </tr>
    <tr>
        <td>scrollHeight</td>
        <td>require</td>
        <td>number</td>
        <td>Height of the single Bar</td>
    </tr>
    <tr>
        <td>renderItem</td>
        <td>require</td>
        <td>React.ReactNode</td>
        <td></td>
    </tr>
    <tr>
        <td>containerStyle</td>
        <td></td>
        <td>StyleProp</td>
        <td>Bar wrap's style</td>
    </tr>
    <tr>
        <td>leftIcon</td>
        <td></td>
        <td>React.ReactNode</td>
        <td></td>
    </tr>
    <tr>
        <td>rightIcon</td>
        <td></td>
        <td>React.ReactNode</td>
        <td></td>
    </tr>
    <tr>
        <td>paddingLeft</td>
        <td>0</td>
        <td>number</td>
        <td>From the left</td>
    </tr>
    <tr>
        <td>delay</td>
        <td>3000</td>
        <td>number</td>
        <td>Animation delay time</td>
    </tr>
    <tr>
        <td>duration</td>
        <td>500</td>
        <td>number</td>
        <td>Duration of each rolling switch</td>
    </tr>
    <tr>
        <td>onChange</td>
        <td></td>
        <td>(index: number) => void;</td>
        <td>Callback when noticebar has changed</td>
    </tr>
   <tr>
      <td>enableAnimation</td>
      <td>true</td>
      <td>boolean</td>
      <td>Animation switch</td>
  </tr>
</table>

如果问题请联系 fwf1024@163.com
