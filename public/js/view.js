var editor;
var replyEditor;

function createEditor(name, minHeight){
	return KindEditor.create("textarea[name='"+name+"']", {
		resizeType : 1,
		allowPreviewEmoticons : false,
		allowImageUpload : false,
		width: "100%",
		minHeight: minHeight,
		items : ['emoticons', 'image', 'link']
	});
}

function removeEditor(name){
	KindEditor.remove("textarea[name='"+name+"']");
}

var Comment = {
	publish: function(){
		var srcId = $("#srcId").val();
		var content = editor.html();
		if(content==''){
			dialog.fail("请输入内容");
			return false;
		}else if(content.length>1000){
			dialog.fail("请输入100字以内的内容");
			return false;
		}
		$.ajax({
			type: 'post',
			url: '/comment/publish.do',
			data: {
				"content": content,
				"resource.id": srcId
			},success: function(data){
				if(data){
					dialog.success("评论成功", function(){
						window.location.reload();
					});
				}else{
					dialog.fail("评论失败");
				}
			},error: function(){
				dialog.fail("请求异常");
			}
		});
	},
	
	reply: function(commentId, srcId){
		var content = replyEditor.html();
		if(content==''){
			dialog.fail("请输入内容");
			return false;
		}else if(content.length>1000){
			dialog.fail("请输入100字以内的内容");
			return false;
		}
		$.ajax({
			type: 'post',
			url: '/comment/reply.do',
			data: {
				"content": content,
				"resource.id": srcId,
				"parent.id": commentId
			},success: function(data){
				if(data){
					dialog.success("回复成功", function(){
						window.location.reload();
					});
				}else{
					dialog.fail("回复失败");
				}
			},error: function(){
				dialog.fail("请求异常");
			}
		});
	}
}

$(function(){
	editor = createEditor("content", "100");
    replyEditor = createEditor("reply", 60);
	
	$(".closeReplyBtn").each(function(){
		$(this).click(function(){
			$(this).hide();
			$(this).prev().show();
			$(this).parent().parent().next().html("");
		});
	});
	
	$(".preReplyBtn").each(function(){
		$(this).click(function(){
			$(".closeReplyBtn").hide();
			$(".preReplyBtn").show();
			$(this).hide();
			$(this).next().show();
			var values = $(this).parent().find("input[type=hidden]");
			var commentId = values.eq(0).val();
			var srcId = values.eq(1).val();
			$(".replyArea").html("");
			$(this).parent().parent().next().html("<textarea name='reply'></textarea>"+
					"<div class='uk-text-right uk-margin-small-top'>"+
						"<button onclick='Comment.reply("+commentId+", "+srcId+")' type='button' class='uk-button uk-button-success'>回复</button>"+
					"</div>");
			replyEditor = createEditor("reply", 60);
		});
	});
})