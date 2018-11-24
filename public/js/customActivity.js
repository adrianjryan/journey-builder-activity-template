define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        console.log("--- On Render Custom Activity ---");
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log("--- Initalising Custom Activity ---");
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};
        console.log("- Validating arguments ");
        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
              //Run through teh rguments and do things with them (key value pairs)  
              //for example
              // if (key === 'message') {
              //       message = val;
              //   }
              
            });
        });

        // connection.trigger('updateButton', {
        //     button: 'next',
        //     text: 'done',
        //     visible: true
        // });

        console.log("--- Initalising Custom Activity COMPLETE ---");
    }

    function onGetTokens(tokens) {
        console.log("--- Auth Tokens ---");
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log("--- endpoints ---");
        console.log(endpoints);
    }

    function save() {
        console.log("--- SAVE Custom Activity ---");

        var name = $('#select1').find('option:selected').html();
        console.log("Selected")
        console.log(name)
        payload.name = "Custom Activity A";

        // var postcardURLValue = $('#postcard-url').val();
        // var postcardTextValue = $('#postcard-text').val();

        payload['arguments'].execute.inArguments = [{
            //"tokens": authTokens,
            //"emailAddress": "{{Contact.Attribute.EmailAddress}}"
            "selected" : value
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});