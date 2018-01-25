# Demo

View examples here: https://persianturtle.github.io/popupjs/

# Philosphy & Goals

Are you comfortable writing CSS/JS? This popup library is for you!

The goals for this project are to:

1.  **make styling easy** without needing to overwrite a bunch of CSS
2.  **allow custom functionality** with access to the raw `event` that triggered a popup's opening/closing
3.  **have no dependencies** with support for modern browsers
4.  **handle the basic stuff** like animations, overlays and preventing body scrolling while open

# Examples

*   <a class="trigger basic">Basic</a>

*   <a class="trigger full-size">Full-size</a>

*   This <a video="https://vimeo.com/groups/freehd/videos/136920991">video popup</a> uses a custom function to set an `iframe's source` from it's trigger's `video` attribute:

        <a video="https://vimeo.com/groups/freehd/videos/136920991">video popup</a>

*   Show an **interstitial** when users click on an [external link](https://www.google.com). This uses `event.target.href` to get the link's URL.

*   Show a popup to visitors before accessing a [url](learn.html), unless there exists a certain **cookie** in the user's browser with an appropriate value. Click [here](learn.html) to learn more.

# Features

*   Allows custom functions to be executed before/after opening/closing with access to the `event` that triggered a popup's opening/closing

*   Opening & closing animations

*   Disable `body` scrolling when a popup is open

*   Automatically closes existing popups before opening new ones

*   Easy styling with minimum default styles

*   Can be used for all types of popups (see examples)

# Getting Started

1.  Include both `popup.js` and `popup.css`. Both, combined is around 1kb minified & gzipped.
2.  Include a popup's HTML with the following wrapper:

        <div class="popup className">
          <div class="content">
          [your popup's HTML here]
          </div>
          <button class="close">×</button>
        </div>

3.  Register the popup by calling the register function:

        window.popup.register("className")

4.  Add custom CSS for your popup. This library provides almost no default styling. It does handle the popup animation as well as the tinted overlay. The rest is up to you!
5.  See the "Usage & Options" section below for all available options.

# Usage

This library exposes three functions:

1.  `window.popup.register(_className[, options]_)`

    **Parameters:**

    `className`

    _string_

    By default, the class name of the popup element:

        <div class="popup className">

    as well as the class names of the trigger elements:

        <a class="trigger className">

    `options`

    _object_

    See a full list of options in the _options_ section.

    **Return value:**

    `popup`

    _object_

    An object with the following shape:

          {
            triggers: NodeList,
            element: Node,
            ...options
          }

2.  `window.popup.open(_popup[, event]_)`

    **Parameters:**

    `popup`

    _object_

    The popup object returned from `window.popup.register`.

    `event`

    _event_

    The event that triggered a popup's opening.

3.  `window.popup.close(_popup[, event]_)`

    **Parameters:**

    `popup`

    _object_

    The popup object returned from `window.popup.register`.

    `event`

    _event_

    The event that triggered a popup's closing.

# Options

`triggers`

_NodeList_

Overwrite the default NodeList of:

    document.querySelectorAll(".trigger.className")

`element`

_Node_

Overwrite the default Node of:

    document.querySelector(".popup.className")

`preventCloseOnOutsideClick`

_boolean_

If true, clicking outside of the popup's `.content` will not close the popup. Default: `false`.

`center`

_boolean_

If true, the popup will be vertically centered. Default: `false`.

`beforeOpen`

_function_

A function that will be executed immediately before a popup opens. The function will be passed in the event that opened the popup.

`afterOpen`

_function_

A function that will be executed immediately after a popup opens. The function will be passed in the event that opened the popup.

`beforeClose`

_function_

A function that will be executed immediately before a popup closes. The function will be passed in the event that closed the popup.

`afterClose`

_function_

A function that will be executed immediately after a popup closes. The function will be passed in the event that closed the popup.
