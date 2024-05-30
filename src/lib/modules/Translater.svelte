<svelte:head>
  <script src="https://cdn.staticfile.net/translate.js/3.2.1/translate.js"></script>
</svelte:head>

<script lang='ts'>
	import { onMount } from "svelte";
	import toast from "svelte-french-toast";

  export let language = 'chinese_simplified';
  let last_lang = 'chinese_simplified';
  let translate:any;

  onMount(()=>{
    // @ts-ignore
    translate = window.translate as any;
    translate.selectLanguageTag.show = false;
    
    translate.language.setLocal('chinese_simplified'); //设置本地语种（当前网页的语种）。如果不设置，默认自动识别当前网页显示文字的语种。 可填写如 'english'、'chinese_simplified' 等，具体参见文档下方关于此的说明。
    translate.service.use('client.edge'); //设置机器翻译服务通道，直接客户端本身，不依赖服务端 。相关说明参考 http://translate.zvo.cn/43086.html
    //translate.execute(); //进行翻译
  });

  $: if(language && language!=last_lang){
    if(translate){
      toast('🌍 Switching language');
      translate.changeLanguage(language);
      last_lang = language;
    }
  } 
</script>