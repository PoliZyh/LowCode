# 基于Vue3 + Ts + Vite的低代码平台

## 介绍

本项目参考 https://github.com/woai3c/visual-drag-demo ,是一个基于Vue3 + Typescript + Vite的低代码LowCode平台

感谢谭光志大大的低代码平台开源项目💓

## 安装
npm install

## 运行
npm run dev

## 任务清单

- [x] 组件样式编辑器
- [x] 自定义组件(按钮、文本、表格...)  ☺️后续将添加更多组件
- [x] 拖拽行为(组件栏-->编辑器, 编辑器-->编辑器)
- [x] 组件放大 / 缩小
- [x] 组件层级调整(置顶 / 置底 / 上移一级 / 下移一级)
- [x] 组件吸附效果以及吸附对其线
- [x] 撤销功能
- [x] 清空画布
- [x] 画布保存与画布路由
- [x] 组件的复制与粘贴
- [x] 画布预览
- [x] 当前页UI导出与路由表UI导出
- [x] 鼠标悬浮预览组件
- [ ] 组件事件行为 => 想法是通过AST实现
- [ ] 组件动画行为
- [ ] 组件旋转
- [x] 查看历史记录
- [ ] 回退历史记录
- [x] 组件剪切
- [ ] 键盘快捷键方式
- [x] 删除组件
- [x] 锁定/解锁组件
- [x] 画布网格线
- [x] 画布属性
- [x] 画布尺寸
- [x] 查看/修改组件JSON
- [ ] 组件合并与拆分
- [x] 路由可视化
- [ ] 首次进入引导页
- [ ] 联合组件
- [ ] 导入/导出 => 想法是通过AST实现
- [ ] 后端以及接口
- [ ] 组件发送ajax请求并渲染至组件



## BUG汇集

- [ ] 超出屏幕校验
- [ ] 圆形组件无法拖拽大小
- [x] 部分组件边框不显示
- [x] 删除组件后，当前组件没有失活
- [x] 网格背景后，第一个组件无法选中
- [x] 路由表路由后点击撤销导致全部组件清空。
- [x] 修改大小画布后，刚拖入的组件位置不对。
- [x] 预览界面大小与画布大小不一致。
- [ ] UI没有导出不可见区域。


## 还有
欢迎大家提出各种意见 期待和各位的交流
