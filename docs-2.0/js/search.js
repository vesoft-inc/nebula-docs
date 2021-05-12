(function(){
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