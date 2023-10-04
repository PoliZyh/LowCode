# 组件功能

## 拖拽功能

### 左侧组件栏 --> 编辑器

使用原生的draggable进行开发

&nbsp; (1) 拖动的元素要赋予draggable属性，属性值为true

&nbsp; (2) 被拖进的元素要在dragover和dragenter事件值中阻止默认行为。
``` 
<html>
    <body>
        <div draggable="true" id="Adiv" class="A">
            A---拖拽的元素
        </div>
        <div id="Bdiv" class="B">
            B---A被拖进的元素
        </div>
    </body>
    <script>
        Bdiv.ondragover = function(e){
            e.preventDefault();
        }
        Bdiv.ondragenter = function(e){
            e.preventDefault();
        }
    </script>
</html>
```
相关方法：

-- 拖拽元素

（1）dragstart方法：

该方法在按下鼠标并且移动鼠标时，会在A上触发该方法。同时鼠标的光标会变成禁用的样子，直到拖动到允许放置A的元素上，禁用的效果就会消失

（2）drag方法：

该方法发生在dragstart之后，只要时在拖动过程之中，该方法就会持续触发

（3）dragend方法：

该方法是在拖动结束的时候触发，也就是当你拖拽后，松开鼠标的一瞬间触发。

-- 拖入元素

（1）dragenter方法：

该方法是指拖拽元素A，在拖入到B之中，B所触发的事件。当然，任何具有draggable属性为true的元素，拖入到B中，都会触发改事件。
切记，这里事件的触发不需要松开鼠标

（2）dragover方法：

该方法只要是，拖拽元素A在目标元素B中移动，就会持续触发。

（3）dragleave方法：

该方法指的是拖拽元素A，在从目标元素B中离开的时候，会触发该方法
这里记住，一定是先进入到B，再离开B的时候触发该事件，也就是说要先触发dragenter方法，才能触发dragleave方法

（4）drop方法：

该方法是指，拖拽元素A被放置了目标元素B中的时候触发，那它和dragenter方法的区别在于，该方法需要鼠标松开才会触发。而这个方法也是最常用的方法。

关键点：

（1）在drag事件处理程序中，可以调用setData方法设置要传递的数据类型和值：
``` js
functiondrag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
```

（2）在drop事件处理程序中，可以调用getData方法获取传递的数据类型和值：
``` js
functiondrop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
}
```

在该功能中我们需要携带拖拽的组件信息，从组件列表到编辑器中

也就是说我们携带的信息是组件设计中的组件在组件列表中的下标索引值

开始拖拽
``` js
const handleDragStart = (e: DragEvent) => {
    e.stopPropagation()
    const target = e.target as HTMLDivElement;
    // 设置传输数据 index 即为当前的组件在componentList中的索引
    if (e.dataTransfer) {
        e.dataTransfer.setData('index', target.dataset.index as string);
    } else {
        ElMessage({
            type: 'warning',
            message: '当前浏览器不支持拖拽'
        })
    }
}
```

结束拖拽
```js
// 松开拖拽的组件事件
const handleDrop = (e: DragEvent) => {
    // 阻止默认行为
    e.preventDefault();
    e.stopPropagation();
    const index = Number(e.dataTransfer?.getData('index')) || 0
    // 拿到组件数据结构
    let component: ICustomeComponent = deepCopy(componentList[index])
}
```


<br />

### 编辑器 --> 编辑器

编辑器到编辑器的拖拽行为向对于简单的多了

我们只需要在点击编辑器组件的时候，记录下当前的坐标，并在之后鼠标的移动中实时更改组件的坐标信息即可

``` js
// 鼠标点下Shape事件
const handleMouseDownOnShape = (e: MouseEvent) => {
    e.stopPropagation()
    // 激活当前组件
    componentStore.setActiveComponent(props.el)
    // 获取当前组件的位置
    const oldStyle = {...props.el.style}
    const { left, top } = oldStyle
    // 获取鼠标点击的位置
    const oldX = e.clientX
    const oldY = e.clientY
    let hasCloseContextmenu = false
    let hasSubmitMoved = false
    const move = (moveEvent: MouseEvent) => {
        // 避免多次触发
        !hasCloseContextmenu && contextmenuStore.deactiveContextmenu()
        !hasSubmitMoved && markLineStore.movingMarkLine()
        hasCloseContextmenu = true
        hasSubmitMoved = true
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        oldStyle.left = curX - oldX + left
        oldStyle.top = curY - oldY + top
        componentStore.setActiveComponentStyle(oldStyle)
        markLineStore.activeLines()
    }

    const up = (mouseEvent: MouseEvent) => {
        // 判断是不是点击Shape，若不是则保存快照
        !handleIsClickShape({
            left: oldX,
            top: oldY
        },{
            left: mouseEvent.clientX,
            top: mouseEvent.clientY
        }) && snapshotStore.saveSnapshot()
        markLineStore.endMovingMarkLine()
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}
```