$(function () {

    const modalWrapper = $('.modalWrapper');
    const modalVideoWrapper = $('.modalVideoWrapper');
    const player = $('#player');
    const initialSrc = player.attr('src'); 

    $('.rightLinkBtnMute').on('click', function () {
        const video = $('.main-video')[0];
        video.muted = !video.muted;

        $(this).css(
            'background',
            video.muted
                ? 'url(/assets/images/btn_off.webp) 50% 50% / contain no-repeat'
                : 'url(/assets/images/btn_voice.webp) 50% 50% / contain no-repeat'
        );
    });

    $('.main-wrapper .main-playBtn').on('click', function () {
        console.log('clicked!');
        modalWrapper.addClass('modalWrapper-active');
        modalVideoWrapper.addClass('modalVideoWrapper-active');

        const video = $('.main-video')[0];
        video.muted = true;

        $('.rightLinkBtnMute').css(
            'background',
            'url(/assets/images/btn_off.webp) 50% 50% / contain no-repeat'
        );
    });

    $('.modalCloseBtn').on('click', function () {
        closeModal();
    });
    
    $('.modalCloseBtn').on('click', function () {
        closeModal();
    });

    function closeModal() {
        console.log("function called");
        modalWrapper.removeClass('modalWrapper-active');
        modalVideoWrapper.removeClass('modalVideoWrapper-active');
        player.attr('src', ''); 
        player.attr('src', initialSrc); 
    }

    $('.modalWrapper').on('click', function (e) {
        const modalVideoWrapper = $('.modalVideoWrapper');
        
        if (!modalVideoWrapper.is(e.target) && modalVideoWrapper.has(e.target).length === 0) {
            closeModal();
        }
    });

    getCookie = (cName) => {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie);
        const cArr = cDecoded.split("; ");
        let value;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) value = val.substring(name.length);
        })

        return value;
    }

    $(".cookiePolicy-acceptBtn").on('click', function (e) {
        $(".cookiePolicyWrapper").css("display", "none");
        setCookie("cookie", true, 30);
    });

    setCookie = (cName, cValue, expDays) => {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${cName}=${cValue}; ${expires}; path=/; SameSite=Lax; Secure`;
    };

    cookieMessage = () => {
        if (!getCookie("cookie")) {
            $(".cookiePolicyWrapper").css("display", "flex");
        }
    };

    $(".cookiePolicy-closeBtn").on('click', function (e) {
        $(".cookiePolicyWrapper").css("display", "none");
        setCookie("cookie", false, 30);
    });
    
    cookieMessage();

    let translations = {};

    // Fetch translations from JSON file
    $.getJSON("/assets/translations.json", function (data) {
        translations = data;
        updateLanguage("zh"); // Default to English on load
    });

    // Event listener for language selection
    $("#language-select").on("change", function () {
        const selectedLang = $(this).val();
        updateLanguage(selectedLang);
        conso
    });

    // Function to update language
    function updateLanguage(lang) {
        $("[data-key]").each(function () {
            const key = $(this).data("key");

            // Check if it's an image
            if ($(this).is("img")) {
                $(this).attr("src", translations[lang][key]); // Update image source
            } else {
                $(this).text(translations[lang][key]); // Update text content
            }
        });
    }

});

