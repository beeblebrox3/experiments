<!doctype html>
<html lang="pt-br">
    <head>
        <title>LuqueMessage</title>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="css/LuqueMessage.css" />
        <style>
         /* just for the demo :) */
            body{
                background: #141414;
            }
            .container{
                width: 940px;
                padding: 0 20px;
                font-family: Arial, Sans-Serif;
                background: white;
                position: relative;
                margin: auto;
                min-height: 500px;
            }
            a{
                display: inline-block;
                padding: 7px 15px;
                background: #191919;
                font-weight: bold;
                font-size: 22px;
                position: relative;
                margin: auto;
                color: white;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <a href="#">click me</a>
        </div>
    </body>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="js/LuqueMessage.js?<?= mt_rand(); ?>"></script>
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-22915768-3']);
        _gaq.push(['_setDomainName', 'luque.cc']);
        _gaq.push(['_trackPageview']);

        (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.defer = 'defer';
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
        $(function(){
            $('a').click(function(){
                abc = $.LuqueMessage({
                    title: 'título',
                    message: 'mensagem <strong>bold</strong> normal :)',
                    actions: [
                        {
                            'id': 'edit',
                            'text': 'click to edit'
                        }
                    ],
                    speed: 300
                });
            });
            $('#edit').live('click', function(){
                abc.update({
                    'title': 'Modified',
                    'message': 'oh, yeah!<br />thats very nice, bro!',
                    'actions': [{'class': 'LuqueClose', 'text': 'close'}]
                });
            });
        });
    </script>
</html>