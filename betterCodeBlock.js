/*
    Instructions: Paste the below into a new JS Frontend Script note. 
    Set the label #widget
*/
class countDownWidget extends api.NoteContextAwareWidget {
    get position() {
        return 100;
    }
    get parentWidget() {
        return 'center-pane';
    }

    isEnabled() {
        return super.isEnabled();
    }
    
    doRender() {
        this.$widget = $(``);
        return this.$widget;
    }

    async refreshWithNote(note) {
        //仅在文本注释中执行
        if (note.type !== 'text') {
            return;
        }
        
        $(document).ready(function () {           
            var container = $("div.note-split:not(.hidden-ext) > div.scrolling-container > div.note-detail");
            
            function performOperationWhenReady(container) {
                //精确定位代码块
                container.find("pre:not(.CodeMirror-line, .CodeMirror-line-like)").each(function() {
            
                    //提取代码块数据
                    var codeContent = $(this)[0].innerText;

                    //双击复制
                    $(this).off('dblclick').on('click', function(event) {
                        if (event.detail === 2) {
                            // 获取代码块元素
                            var codeBlock = event.currentTarget; 
                            // 获取行高
                            var lineHeight = parseFloat(window.getComputedStyle(codeBlock).lineHeight); 
                            // 计算鼠标点击位置相对于代码块顶部的偏移量
                            var offsetY = event.clientY - codeBlock.getBoundingClientRect().top; 
                            // 计算当前鼠标双击的行数
                            var lineNumber = Math.floor(offsetY / lineHeight); 
                            // 将代码块文本按行分割成数组
                            var lines = codeBlock.innerText.split('\n'); 
                            // 获取当前鼠标双击的行的文本内容
                            var currentLineText = lines[lineNumber]; 
                            navigator.clipboard.writeText(currentLineText);
                            api.showMessage('代码行已复制!');
                        }
                        if (event.detail === 3) {
                            navigator.clipboard.writeText(codeContent);
                            api.showMessage('代码块已复制!');
                        }
                    });


                });
            }
            //等待编辑器加载内容，防止出现意外情况
            setTimeout(performOperationWhenReady, config.executeDelay, container);
        });
    }
}

module.exports = new countDownWidget();
