var pr = function(){
    console.log(arguments);
};

var join_array = function(){
    var data = arguments;
    var response = [];

    if(typeof(data) != 'object'){
        response.push(data));
    } else if(data.length == 1){
        if(typeof(data[0]) != 'object'){
            response.push(data);
        } else {
            var isArray = true;
            try{
                data[0].push(1);
                data[0].pop();
            } catch(exception){
                isArray = false;
            }

            if(!isArray){
                
            }
        }
    }
}