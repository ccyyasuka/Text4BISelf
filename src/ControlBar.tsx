import type { MenuProps } from 'antd';
import React from 'react';
import { globalStateType, textType, entity} from './globalStateType';
import { useState } from 'react';
import ControlTextType from './components/ControlTextType';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import ControlTextPhraseBoolean from './components/ControlTextPhraseBold';
const initialGlobalState: globalStateType = {
    type: 'text',  // 选择 'textType' 中的一个作为默认值
    scene: {
        background: "#ffffff" // 或其他你选择的默认颜色
    },
    TextPhraseSpec: null,
    EscapePhraseSpec: null,
    FormulaPhraseSpec: null,
    entity: {
        value: '',
        entityType: 'metric_name',  // 选择 'entityType' 中的一个作为默认值
        origin: 0,  // 或其他你选择的默认值
        assessment: '',
        generateVariableInfo: '',
        style: {
            font: 'Arial',  // 或其他你选择的默认字体
            fontSize: 12,  // 或其他你选择的默认字号
            fontColor: '#000000',  // 或其他你选择的默认颜色
            fontWeight: 'normal',  // 或其他你选择的默认值
            textDecoration: 'none',  // 或其他你选择的默认值
            textAlign: 'left',  // 或其他你选择的默认值
            lineHeight: 1.5,  // 或其他你选择的默认值
            letterSpacing: 1  // 或其他你选择的默认值
        }
    }
};


const ControlBar: React.FC = () => {
    
  const [GlobalState, setGlobalState] = useState<globalStateType>(initialGlobalState);
  
  const ChangeTextType: MenuProps['onClick'] = ({ key }) => {
    console.log('Click on item', key);
    // if (typeof key === 'string' && ['text' , 'escape' , 'formula' ,'entity' , 'custom'].includes(key))
    type Example = 'text' extends textType ? true : false;
    // console.log(Example)
        setGlobalState(prevState => ({ ...prevState, type: key as textType  }));//as textType告诉typescript key是textType类型 没有更优雅的方法了吗
    // setGlobalState(prevState=>({ 
    //   ...prevState,
    //   entity:{
    //     ...prevState.entity,
    //     value:key as string
    //   }
    // }))
    if (typeof key === 'string') {
      setGlobalState(prevState=>({ 
        ...prevState,
        entity:{
          ...prevState.entity,
          value:key as string
        } as entity
      }))

    }
    console.log(GlobalState)
    //不能用setGlobalState的返回值，因为setGlobalState是异步的
    //不能直接查看GlobalState，因为GlobalState是旧的值，所有改变的值要等到下一次渲染才会集中更新
  };
 
  const ChangeSceneBackground : MenuProps["onClick"] = ({key}) => {
    setGlobalState(prevState => ({ 
      ...prevState, 
      scene: { 
        background: key
       } }));
  };//为什么这里不用as sceneType，ts怎么知道key是string类型


  const ChangeTextPhraseBoolean=(checkedValues:CheckboxValueType[])=>{
    console.log(checkedValues)
  }


  return (<div>
    <ControlTextType onClick = {ChangeTextType}></ControlTextType>
    <ControlTextPhraseBoolean onClick = {ChangeTextPhraseBoolean}></ControlTextPhraseBoolean>
  </div>);
};

export default ControlBar;
