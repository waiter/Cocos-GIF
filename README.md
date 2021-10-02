## Cocos Creator 支持 GIF

### 支持版本

**v2.4.x**

### 核心思想

将GIF解析，用帧动画来展现，借鉴 https://github.com/baibai2013/cocos-creator-gifLib 该项目来实现

### 简单使用说明

- 复制`assets/scripts/gif`目录下所有文件到项目
- 尽可能早得在脚本中引入`GIFLoadInit.ts`，因为其主要让引擎自动加载解析
- 使用`CCGIF`组件来运行GIF动画，里面实现可以自行修改


