var detail = {};
$(document).ready(function() {

    $.ajax({
        type: "GET",
        // data:list_detail,
        // dataType: "json",
        //headers:{"Content-Type":"application/json"},
        url: "http://localhost:8081/checksession",
        success: function(data) {
            //  alert(data);
            //  console.log(data.session);
            if (data.session === false) {
                console.log("no user");
                //  window.location.hash = "#home";
                indexPage();
            } else {
                callPage();
            }
        }
    });

    // if (sessionStorage.getItem("email") !== null) {
    //     console.log(sessionStorage.getItem('email'));
    //     // event.preventDefault();
    //     callPage();
    //     // return;
    // }
    // $.ajax();
    // checkSession();
    function indexPage() {
        $.ajax({
            url: "index.html",
            type: "GET",
            dataType: "html",
            success: function(response) {
                console.log('the page was loaded');
                // $('body').html(response);
            },
            error: function(error) {
                console.log('the page was NOT loaded', error);
            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            }
        })
    }


    function callPage() {
        $.ajax({
            url: "template/home.html",
            type: "GET",
            dataType: "html",
            success: function(response) {
                // console.log('the page was loaded', response);
                $('body').html(response);
            },
            error: function(error) {
                console.log('the page was NOT loaded', error);
            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            }
        })
    }
    $(document).on("click", "#logout", (function() {
        // console.log("asddd");
        // sessionStorage.removeItem("email");
        $.ajax({
            type: "GET",
            // data:list_detail,
            // dataType: "json",
            //headers:{"Content-Type":"application/json"},
            url: "http://localhost:8081/logout",
            success: function(data) {
                //  alert(data);
                if (data.session == false) {
                    window.location.hash = "#home";
                    location.reload();
                }
                // callPage();
            }
        });
        // window.location.origin = window.location.protocol + "//" + window.location.host;
        return;
    }));

    $(document).on("submit", "#signupForm", (function(event) {
        var user_name = $("#user_name").val();
        var email = $("#email").val();
        var gender = $("input:radio:checked").val();
        var phone_no = $("#pno").val();
        var pass = $("#pwd").val();
        var rpass = $("#rpwd").val();
        var list_detail = {};
        list_detail["user_name"] = user_name;
        list_detail["email"] = email;
        list_detail["gender"] = gender;
        list_detail["phone_no"] = phone_no;
        list_detail["password"] = pass;
        $.ajax({
            type: "POST",
            data: list_detail,
            dataType: "json",
            //headers:{"Content-Type":"application/json"},
            url: "http://localhost:8081/signup",
            success: function(data) {
                // alert(data);
                if (data.status == true && data.session == true) {
                    callPage();
                    return;
                }
                if (data[0] !== undefined) {
                    $("span").remove();
                    $("#sendDetail").after('<span id="errorMessage">&nbsp&nbsp&nbsp' + data[0].msg + '</span>');
                }else if(data.message!==undefined){
                  console.log(data.message);
                  $("span").remove();
                  $("#sendDetail").after('<span id="errorMessage">&nbsp&nbsp&nbsp' + data.message + '</span>');
                }


            },
            error: function(error) {
                //  alert(data);
                console.log("page not loded");
            }
            // callPage();
        });
        // console.log(detail);
        // try {
        //
        //     if (user_name.length < 4) {
        //         throw 'Re-Enter User Name "too Short"';
        //     } else if (!checkPassword(pass)) {
        //         throw "week password special char allowed @ # $ % & _";
        //     } else if (!checkPhoneNo(phone_no)) {
        //         throw "invalid phone no...!!!";
        //     } else if (pass == rpass) {
        //         if (localStorage.getItem("detail") == null) {
        //             console.log("null");
        //             detail[email] = list_detail;
        //             if (typeof(Storage) !== "undefined")
        //             {
        //                 localStorage.setItem('detail', JSON.stringify(detail));
        //                 // alert("thanks for Sign Up");
        //                 event.preventDefault();
        //                 sessionStorage.removeItem("email");
        //                 sessionStorage.setItem("email", email);
        //                 callPage();
        //                 return;
        //             }
        //             else
        //             {
        //                 throw "localStorage not found";
        //             }
        //         } else {
        //             detail = localStorage.getItem("detail");
        //             var detail = JSON.parse(detail);
        //             detail[email] = list_detail;
        //             if (typeof(Storage) !== "undefined") {
        //                 localStorage.setItem('detail', JSON.stringify(detail));
        //                 // alert("thanks for Sign Up");
        //                 event.preventDefault();
        //                 sessionStorage.removeItem("email");
        //                 sessionStorage.setItem("email", email);
        //                 callPage();
        //                 return;
        //             } else {
        //                 throw "localStorage not found";
        //             }
        //         }
        //     } else {
        //
        //         throw "password miss match...!!! Re-Enter password";
        //     }
        // } catch (error) {
        //     alert(error);
        // }
        // event.preventDefault();
    }));

    $(document).on("submit", "#loginForm", (function(event) {
        var email = $("#checkemail").val();
        var password = $("#checkpwd").val();
        var logindata = {};
        logindata["email"] = email;
        logindata["password"] = password;
        // JSON.stringify(logindata);
        // console.log(logindata);
        $.ajax({
            type: "POST",
            data: logindata,
            dataType: "json",
            //  headers:{"Content-Type":"application/json"},
            url: "http://localhost:8081/login",
            success: function(data) {
                //  alert(data);
                //  callPage();
                // console.log(data.status);
                if (data.status == true && data.session == true) {
                    callPage();
                    return;
                } else {
                    if (data[0] !== undefined) {
                        $("span").remove();
                        $("#login").after('<span id="errorMessage">&nbsp&nbsp&nbsp' + data[0].msg + '</span>');
                    }else if(data.message!==undefined){
                      console.log(data.message);
                      $("span").remove();
                      // console.log(data);
                      $("#login").after('<span id="errorMessage">&nbsp&nbsp&nbsp' + data.message + '</span>');
                    }

                }
            },
            error: function(error) {
                //  alert(data);
                alert("cant load the page");
                console.log("page not loded");
            }
        });
        // try {
        //     if (!checkEmail(email)) {
        //         throw "incorrect email...!!!";
        //         event.preventDefault();
        //     }
        // } catch (e) {
        //     alert(e);
        //     return;
        // }
        //geting stored data from localStorage
        // var detail = localStorage.getItem("detail");
        // var list_detail = JSON.parse(detail);
        // console.log(list_detail);
        // // console.log(dont);
        // try {
        //     //checking the local storage is null or not
        //     if (list_detail == null) {
        //         throw "please Sign Up";
        //     }
        //     //matching email in json
        //     if (list_detail.hasOwnProperty(email)) {
        //         //matching password
        //         if (pwd == list_detail[email]["password"]) {
        //             console.log(list_detail[email]);
        //             event.preventDefault();
        //             // if(typeof(Storage) !== "undefined") {
        //             sessionStorage.setItem("email", email);
        //             // }
        //             //calling $.ajax() method to link to another page(home page)
        //             callPage();
        //             return;
        //         } else {
        //             throw "password incorrect";
        //         }
        //     } else {
        //         throw "email not registered";
        //     }
        // } catch (e) {
        //     alert(e);
        //     // return;
        // }
        // event.preventDefault();
    }));
    // var checkEmail = function(email) {
    //   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //   return regex.test(email);
    // }
    var checkPassword = function(pass) {
        var regex = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/;
        return regex.test(pass);
    }
    var checkPhoneNo = function(phone_no) {
        var regex = /^([7-9]{1}[0-9]{9})$/;
        return regex.test(phone_no);
    }
    //-------------------------------------------------------------------------------------------------

    // if (typeof window.location.origin === "undefined"){
    //     window.location.origin = window.location.protocol + "//" + window.location.host;
    // }
    // Utility (helper) functions
    var utils = {

        // Finds a handlebars template by id.
        // Populates it with the passed in data
        // Appends the generated html to div#order-page-container
        renderPageTemplate: function(templateId, data) {
            console.log(templateId);
            var _data = data || {};
            var templateScript = $(templateId).html();
            var template = Handlebars.compile(templateScript);
            // Empty the container and append new content
            $("#page-container").empty();

            // Empty the container and append new content
            $("#page-container").append(template(_data));
        },

        // If a hash can not be found in routes
        // then this function gets called to show the 404 error page
        pageNotFoundError: function() {

            var data = {
                errorMessage: "404 - Page Not Found"
            };
            this.renderPageTemplate("#error-page-template", data);
        },

        // Fetch json data from the given url
        // @return promise
        // fetch: function(url, data) {
        //     var _data = data || {};
        //     return $.ajax({
        //         context: this,
        //         url: window.location.origin + "/" + url,
        //         data: _data,
        //         method: "GET",
        //         dataType: "JSON"
        //     });
        // }
    };

    /**
     *  Router - Handles routing and rendering for the order pages
     *
     *  Summary:
     *      - url hash changes
     *      - render function checks routes for the hash changes
     *      - function for that hash gets called and loads page content
     */
    var router = {

        // An object of all the routes
        routes: {},
        init: function() {
            console.log('router was created...');
            this.bindEvents();

            // Manually trigger a hashchange to start the router.
            // This make the render function look for the route called "" (empty string)
            // and call it"s function
            $(window).trigger("hashchange");
        },
        bindEvents: function() {

            // Event handler that calls the render function on every hashchange.
            // The render function will look up the route and call the function
            // that is mapped to the route name in the route map.
            // .bind(this) changes the scope of the function to the
            // current object rather than the element the event is bound to.
            $(window).on("hashchange", this.render.bind(this));
        },
        // Checks the current url hash tag
        // and calls the function with that name
        // in the routes
        render: function() {

            // Get the keyword from the url.
            var keyName = window.location.hash.split("/")[0];
            console.log(keyName);
            // Grab anything after the hash
            var url = window.location.hash;
            console.log(url);
            // Hide whatever page is currently shown.
            $("#page-container")
                .find(".active")
                .hide()
                .removeClass("active");

            // Call the the function
            // by key name
            if (this.routes[keyName]) {
                this.routes[keyName](url);

                // Render the error page if the
                // keyword is not found in routes.
            } else {
                utils.pageNotFoundError();
            }
        }
    };

    var spaRoutes = {

        // Default route (home page)
        "#home": function(url) {
            console.log('home was called...');
            utils.renderPageTemplate("#home-page-template");

        },
        "#about": function(url) {
            console.log('about was called...');
            utils.renderPageTemplate("#about-page-template");
        },
        "#contact": function(url) {
            console.log('contact was called...');
            utils.renderPageTemplate("#contact-page-template");
        },
        "#login": function(url) {
            console.log('login was called...');
            utils.renderPageTemplate("#login-page-template");
        },
        "#signup": function(url) {
            console.log('signup was called...');
            utils.renderPageTemplate("#signup-page-template");
        }
    };

    // Create a new instance of the router
    var spaRouter = $.extend({}, router, {
        routes: spaRoutes
    });

    spaRouter.init();
    // window.location.hash = "#home";



});
