(function(){
    $("img").click(function(){
        $(this).toggleClass("max");
        $("#dialog-bg").toggleClass("dialog-bg");
        $('.max').css("left",`calc(50vh)-${$(this).width()}`)
        $(this).each(function () {
            var $this = $(this);
            var $img = $this.attr("src");//获取当前点击img的src的值
            $("#img-box").find("img").attr("src",$img);//将获取的当前点击img的src赋值到弹出层的图片的src
            // $("#dialog-bg").show();//弹出层显示
        });
    });
    // $("#dialog-bg").on("click",function () {
    //     $(this).hide();
    //     $("img").click(function(){
    //         $(this).toggleClass("max");
    //     })
    // });
    const Search={
        init:function(){
            this.attachEvent();
            this.render();
        },
        attachEvent(){
            $('#search-btn').click(function(){
                $('#splice-query').val($('#query-param').val() + ' site:kunzhang.me');
                $('.bing-box').css("display","block");
            });
            $('#close-icon').click(function(){
                $('.bing-box').css("display","none");
            });
            $('#query-param').keyup(function(){
                $('#splice-query').val($('#query-param').val())
            })
        },
        renderGoogleSearch(){
            var googleHtml="<div class='gcse-search'></div><script src='https://cse.google.com/cse.js?cx=008473639027829005971:tevo895mqp8'>";
            $('#google-search').append(googleHtml);
            $('#bing-search').css('display','none');
        },
        renderBingSearch(){
            $('#bing-search').css('display','block');
        },
        checkGoogleSearchUsable(){
            return new Promise((resolve, reject) =>{
                var image = new Image();
                image.onload  = resolve;
                setTimeout(_=>{
                    reject();
                },4000)
                image.onerror = reject;
                image.src = "https://google.com/favicon.ico?" + Math.random();
            });
        },
        render:function() {
            this.checkGoogleSearchUsable().then(res=>{
                this.renderGoogleSearch();
            }).catch(err=>{
                // this.renderBingSearch();
            })
        },
    }
    Search.init();
})()