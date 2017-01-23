var mandrill = require('mandrill-api/mandrill')
var mandrill_client = new mandrill.Mandrill('v-rcDbGl9In6Rkvxx69mkQ')
var response = require('palmettoflow-event').response
var responseError = require('palmettoflow-event').responseError


module.exports = function () {
  return function (ee) {
  	ee.on('/email/send', function (event) {
  		var message = {
	    "html": "<p>" + event.object.message + "</p>" +
      "<p>" + " " + "</p>" +
      "<p><strong>" + "Person Requesting Information" + "</strong></p>" +
      "<p>NAME:  " + event.object.name + "</p>" +
      "<p>EMAIL:  " + event.object.email + "</p>" +
      "<p>PHONE:  " + event.object.phone + "</p>",

	    "text": "Hello World!",
	    "subject": event.object.subject + " - " + 'Information Request',
	    "from_email":"hosea@obviouslee.com",
	    "from_name": event.object.name ,
	    "to": [{
	      "email": "hosea@obviouslee.com",
	      "name": "Recipient Name",
	      "type": "to"
	    }],
	    "headers": {
	      "Reply-To": event.object.name + ' <' + event.object.email + '>'
	    },
	    "important": false,
	    "track_opens": null,
	    "track_clicks": null,
	    "auto_text": null,
	    "auto_html": null,
	    "inline_css": null,
	    "url_strip_qs": null,
	    "preserve_recipients": null,
	    "view_content_link": null,
	    "bcc_address": "bcc_address.email@example.com",
	    "tracking_domain": null,
	    "signing_domain": null,
	    "return_path_domain": null,
	    "merge": true,
	    "merge_language": "mailchimp",
	    "global_merge_vars": [{
	            "name": "merge1",
	            "content": "merge1 content"
	        }],
	    "merge_vars": [{
	            "rcpt": "recipient.email@example.com",
	            "vars": [{
	                    "name": "merge2",
	                    "content": "merge2 content"
	                }]
	        }],
	    "tags": [
	      "password-resets"
	    ]
	}
	var async = false
	var ip_pool = "Main Pool"
	var send_at = new Date()
	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
	    console.log(result)
	    return(result)

	    // [{
	    //   "email": "recipient.email@example.com",
	    //   "status": "sent",
	    //   "reject_reason": "hard-bounce",
	    //   "_id": "abc123abc123abc123abc123abc123"
	    // }]

	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	})
  	})
  }
}
