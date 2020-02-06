# v2.85.5 - Documentation update to reflect Vendor Marketplace as a resource

## Bug Fixes

* Vendor Marketplace is an resource not a product. Showing that in the documentation.
* Added missing vote-thumbs-middle icon to documentation.

# v2.85.4 - Fix click event on mobile table bulk actions

## Bug Fixes

* Add missing click handling on mobile bulk actions toggle

# v2.85.3 - Fix broken mobile styles for table bulk actions

## Bug Fixes

* Instead of smashing together on mobile, the buttons now drop into an action bar at the bottom of the mobile viewport and expand upward to reveal an action menu on click.
* Instead of overlapping table filters on desktop, bulk actions expand, pushing the table down for a more noticeable interaction.

# v2.85.2 - Notifications Accessibility Bugs

## Bug Fixes

* Fix mismatch between left nav media query and notifications causing spacing bug
* Update green to WCAG compliant color
* Remove yellow warning-style notifications from the docs and deprecate as white text on yellow will always fail to be WCAG compliant

# v2.85.1 - Fix nav initialization bug, which was throwing an exception (#462)

## Bug fixes

* Prevent initialization of empty navigation

# v2.85.0 - Enable component initialization when added dynamically

## Improvements

* Adds RAUL.bootstrap() method to initialize components injected into the page after DOMContentLoaded, for example, in a single page application.

# v2.84.1 - Handle falsey values as arguments to the icon component

## Bug Fixes

* Prevent console errors when you don't pass an icon name to ui-icon

# v2.84.0 - Extend ui-datepicker Single Date To Include Events

## Improvements

*  Add blur, focus, keyup and keydown events to ui-datepicker custom element

# v2.83.5 - Prevent global header js from breaking if more menu is removed

## Bug Fixes

* Fix global header javascript for products where the more menu is removed, by preventing event triggering on removed items.

# v2.83.4 - Step tracker mobile button bug and arrow thickness bug

## Bug Fixes

* Fix bugs causing some arrows to appear wider due to rounding errors
* Move step tracker mobile styles out of core raul and into step tracker plugin scss
* Fix footer buttons on mobile so they are side by side not stacked

# v2.83.3 - Make notifications full width for portrait tablet

## Bug Fixes

* Fix bug where notifications had extra space on the left at portrait tablets screen size

# v2.83.2 - Fix documentation favicon console error

## Bug Fixes

* Fix favicon in styleguide
* Fix favicon in demo

# v2.83.1 - Fix wording in example code for unified login to unified platform

## Bug Fixes

* Replace incorrect wording in example code for the RealPage Unified Platform login button. Unified Login now reads Unified Platform everywhere.

# v2.83.0 - Add custom product and omnibar icons

## Improvements

* Add product family, product and resource icons to the documentation
* Split out usage, search and product icons into their own tabs
* Add missing custom icons from design team
* Improve css for icon colors to not rely on specific IDs inside the svg files

# v2.82.12 - Fix alignment of app switcher icon text and product family icons

## Bug Fixes

* Fix alignment of app switcher product text within their tiles
* Fix alignment of product family icons with their titles

# v2.82.11 - Add color back to dark nav switch in Omnibar

## Bug Fixes

* Add back the green (on) and grey (off) colors to the dark nav switch inside user context menu

# v2.82.10 - Fix broken build by upgrading "natives" dependency

## Bug Fixes

* Upgrading the natives package to fix the RAUL build

# v2.82.9 - Datepickers are not auto closing

## Bug Fixes

* Single date picker now auto closes by default on selection of a date
* Date range picker now focuses the end date on selection of start, and closes on selection of end date.

# v2.82.8 - Header icons missing in omnibar header in IE11

## Bug Fixes

* Internet Explorer 11 requires fetch and promise polyfills to work correctly. We missed these when creating the dependency version of the ui-shell custom element (Omnibar). We added fetch, but opted to not include the Babel polyfill directly but require it as a dependency since some teams already have Babel in their application and two instances don't play well together.

# v2.82.7 - Fix modal button alignment in IE 11

## Bug Fixes

* Fixes a bug in Internet Explorer where modal buttons were extending out of the modal

# v2.82.6 - Fix custom element app switcher reinstatiation bug

## Bug Fixes

* Realpage Unified Platform contains features to update what might show in a users app switcher. In these situations, they reinstatiate the app switcher with updated json for the users. This fixes a bug in custom elements version of the app switcher that prevented the app switcher from refreshing when there was already a switcher on the page.

# v2.82.5 - Fix dropdown custom element version with missing raul- prefix

## Bug Fixes

* Fix dropdown custom not instantiating correctly due to missing raul- prefix

# v2.82.4 - Fix mobile menu for portrait tablets

## Bug Fixes

* Switch to overlaying mobile menu for portrait tablets to prevent crushing layouts
* Fix bug preventing closure of overlay mobile menu by clicking outside of the menu

# v2.82.3 - App Switcher Cannot Be Updated After Initial Declaration

## Bug Fixes

* Allow AppSwitcher to be re-instantiated for updated content

# v2.82.2 - Add missing backport variable to release script

## Bug Fixes

* Fixed release script error where an undefined variable was breaking releases

# v2.82.1 - Fix accidental copy paste artifacts

## Bug Fixes

* Fixed copy paste remnants of code that were breaking releases

# v2.82.0 - Add documentation and styles for unified login button code

## Improvements

* Add documentation and styles for unified login button code

# v2.81.2 - Fix mobile navigations not closing properly

## Bug Fixes

* Remove touch related event listeners due to having them already being taken care of on click events

# v2.81.1 - Support stable versioning

## Infrastructure

*  Modify script to support stable releases and backporting
*  Remove force pushing on release
*  Add documentation for creating stable releases and backport releases

# v2.81.0 - Add class and data-attribute options for data-driven left navigation

## Improvements

* Extend data-driven left navigation accept custom classes and attributes
* Update left navigation documentation

# v2.80.0 - Allow onclick event for user context items

## Improvements

* Allow users to add classes to log out button
* Allow users to add classes to user settings button and to set callbacks to log out and user settings click events

# v2.79.1 - Check if elements exist before auto loading bulk actions and table filters

## Bug Fixes

* Improves compatibility with single page applications by adding a check for elements in the DOM before auto loading bulk actions and table filters

# v2.79.0 - Create separate CDN build for MVP items and icons

## Improvements

* Creates a no-dependency cdn build which includes mvp items (global header, page header, left nav, buttons, colors, typography)
* No-dependency means we removed the need for jquery, bootstrap and font-awesome in mvp.
* Also includes the ui-icon library


# v2.78.3 - Add missing hover and drop styles to dropzone file uploader plugin

## Bug Fixes

* Adds missing hover styles when clicking the uploader to browser for files
* Adds missing hover styles when dragging a file into the uploader

# v2.78.2 - Fix Babel Encoding Issues

## Bug fixes

* Fixed Babel issue by setting character encoding to Unicode

# v2.78.1 - Prevent notifications from blocking breadcrumb clicks

## Bug Fixes

* Hide notifications container when notifications are not visible. This allows breadcrumbs to be clicked

# v2.78.0 - Document Check-All for Checkboxes

## Improvements

* Adds check-all documentation to the forms page, showing data-attribute and javascript api to link a group of checkboxes to a master checkbox. This is the same javascript used in multi-select menus and bulk table actions.

# v2.77.0 - Add Data-Driven Left Nav

## Improvements

* Previously, in both custom element and html versions of the left nav, teams supplied complicated list markup to drive the left nav. This changes allows the menu to drive off of json.
* Data driven left nav allows both FontAwesome icons and RAUL UI-Icons
* Improvements to left nav documentation


# v2.76.1 - Fix Notifications Mobile Display

## Bug Fixes

* Make dismissed notifications disappear completely on mobile
* Allow more space for the title on mobile

# v2.76.0 - Custom Element Option for Dropdowns

## Improvements

* Create an custom elements option for dropdowns, greatly simplifying markup
* Add custom elements API and documentation

# v2.75.0 - Namespace Dropdown and Loader Components to Minimize Collision

## Improvements

* Adds raul- class prefix to dropdown and loader components
* Adds breaking change warnings to relevant pages in the styleguide

# v2.74.3 - Fix Notification Link Hover and Target

## Bug Fixes

* Reverse underline hovers on links so it's clearer links are clickable
* Remove forced opening of links in new windows

# v2.74.2 - Fix Sortable Reorder Drag Handler Version in Firefox and Edge

## Bug Fixes

* Fix sortable reorder component issue in Firefox and Edge where the drag handler version didn't drag when grabbing the button handle, and the contained checkboxes were not checkable

# v2.74.1 - Fix UI-Icon Display in IE11

## Bug Fixes

* Fix bug that caused ui-icon to break in IE11

# v2.74.0 - Add raul.js Option Without Babel Polyfill Included

## Improvements

* RAUL requires the Babel polyfill for IE11 support. However some teams are also including it in their applications directly. In these situations there is a conflict with Babel loading twice. This release puts a build of raul js without Babel in the cdn.
* https://cdn.realpage.com/raul/v2.74/js/raul-no-babel-polyfill.min.gz.js

# v2.73.0 - Improved Handling of Multiple Notifications and Notifications API

## Improvements

* When multiple notifications fire, they now stack instead of overlapping each other
* Added close all, expand all, clear all buttons
* Extended the api and documentation

## Bug Fixes

* Fixed situations where the notifications could overlap the left nav
* Fixed animation smoothness
* Added a small border between notifications of same color

# v2.72.0 - Add Custom Element SVG Icons

## New Features

*  Add svg icons via custom elements
*  Add icon documentation

# v2.71.0 - Step Tracker Callbacks Improvements

## Improvements

* Added more options for RAUL.StepTracker class
* Updated and improved step tracker documentation

## Bug fixes

* Removed Bootstrap Wizard from dependencies since it is internally imported into step tracker plugin now
* Removed step tracker onBack callback since it was useless
* Fixed callbacks to allow disabling step tracker's events


# v2.70.0 - Create Custom Element Option for Carousels

## New Features

* Added a custom element version of carousels to simplify use and templatize markup
* Custom element carousels are in alpha


# v2.69.0 - Improve Custom Elements Documentation and Clarify Alpha Status

## Improvements

* Improved documentation layout for all components divide content into tabs
* Labeled custom elements as Alpha everywhere. We are still testing them and may refactor.
* Improved HTML documentation for date picker


# v2.68.1 - Fix Checkbox Display Inside Accordion

## Bug Fixes

* Fixed bug where checkboxes were displaying upside down in an accordion

# v2.68.0 - Extend Date Picker Custom Element

## Improvements

* Added min and max date options for date picker custom element
* Added support for grouped date range picker
* Added API endpoints for min and max date
* Added property watchers for min and max date to automatically update the datepickers when props change

## Bug Fixes

* Fixed inline date range picker selected days highlighting styling issue

# v2.67.0 - Add Custom Element Option for Action Menus

## New Features

* Added custom element option and documentation for action menus
* Added hover states to action menu items

# v2.66.1 - Fix Sortable Import Bug

## Bug Fixes

* Fix the import of the Sortable package driving draggable reorder

# v2.66.0 - New Component Sortable Reorder via Dragging

## New Features

* Add component for sorting list items and table rows via dragging

# v2.65.3 - Centered Modal Should Have Center Buttons

## Bug Fixes

* In the centered modal, center align the modal footer buttons

# v2.65.2 - Fix aside modals with tabs background color

## Bug Fixes

* Make tabs inside aside modals look like part of the darker header

# v2.65.1 - Remove Tooltip Height Restriction

## Bug Fixes

* Tooltips now expand to the size of their content. Please use responsibly.

# v2.65.0 - Stable Release and Backporting Capability

## Improvements

* Updated release script to allow backporting versions
  * Backports follow the syntax `> backports vX.X.X` and it is added as a line between the title and the body

# v2.64.0 - Step Tracker Improvements

## Improvements

* Extracted step tracker into own plugin
* Added initialization options to allow custom instantiation of step trackers
* Created ability to instantiate multiple step trackers
* Added API hooks for various events
* Improved overall styleguide performance by only loading plugin scripts on plugin pages

## Bug Fixes

* Fixed Babel style warnings during build
* Cleaned up code formatting for various documentation pages

# v2.63.2 - Accordion with Long Content Bug

## Bug Fixes

* Allow long accordion content without being cut off by changing the animation strategy to use javascript instead of css.

# v2.63.1 - Carousel Border and Arrow Bugs

## Bug Fixes

* Fixed border issues in grid carousel
* Fixed issues on basic carousel to properly show/hide arrows

# v2.63.0 - Vue Custom Element Update

## Improvements

* Update Vue Custom Element from v3.1.0 to v3.2.3 in order to get various updates such as valueless boolean fixes. These updates can be viewed on the project's changelog.

# v2.62.1 - IE11 Subnav Scroll Bar Persistence

## Bug Fixes

* Fixed issue in IE11 with scrollbar persisting for subnav menus when the left nav is collapsed

# v2.62.0 - Custom Elements Documentation

## Improvements

* Added documentation describing Custom Elements
* Added documentation on how to use UI Shell (ui-shell) and it's componentized version
* Restructured left navigation to make more sense
  * Added section for global content and moved appropriated pages
  * Removed MVP section
  * Restructured order of links to better order content
  * Updated icons to better communicate intent

# v2.61.1 - Dropdown Text Height

## Bug Fixes

* Fixed issue with dropdowns where the text would get cut off on the descenders

# v2.61.0 - ag-Grid Plugin

## New Features

* Added ag-Grid as a RAUL plugin
* Added custom styling
* Added example usage and documentation

# v2.60.2 - Checkbox and Radio Input Fixes

## Bug Fixes

* Fixed checkbox and radio input alignment
* Fixed checkboxes and radio inputs to allow them to be added without text
* Added spacing fixes for toggles and inputs
* Fixed list groups checkboxes to use correct markup
* Fixed right aligned checkboxes

# v2.60.1 - Mobile Sub Nav Toggle Fix

## Bug Fixes

* Fixed issue where subnav would not toggle in mobile view

# v2.60.0 - Inline Date Range Picker

## Improvements

* Added option for new inline Date Range Picker
* Extended picker API to include getters and setters for date, startDate, and endDate
* Added Date Range examples to styleguide

# v2.59.0 - Framework Integration Examples

## Improvements

* Added integration examples of RAUL working with various frameworks
  * AngularJS
  * Angular6
  * React
  * Vue
* Added links in introduction section for new framework integration examples

## Bug Fixes

* Fixed left nav icon to word spacing where the spacing relied on at least one whitespace character

# v2.58.1 - Angular6 Firefox Custom Element

## Bug Fixes

* Fixed issue where slots where not loaded correctly in Firefox (and only Firefox)
* Swapped document-register-element for webcomponents-custom-elements polyfill

# v2.58.0 - Add RAUL Coverage for Google Maps Plugin

## New Features

* Create RAUL styles and documentation for Google Maps

# v2.57.6 - Fix Safari and IE11 Dropdown Bug

## Bug Fixes

* Fix generic dropdown being unresponsive in Safari and IE11
* Fix table pagination drowdown being unresponsive in Safari and IE11

# v2.57.5 - App Switcher Positioning Fix For IE11

## Bug Fixes

* Fixed the positioning of the App Switcher flyout in IE11

# v2.57.4 - Styleguide Link Consistency

## Bug Fixes

* Fixed "dependencies" button url on installation page
* Fixed "contributing" button url on Installation page
* Updated left nav urls in example page with empty hashes

# v2.57.3 - Form Toggles IE11

## Bug Fixes

* Fixed IE11 issue with form toggle styles creating layout issues

# v2.57.2 - Checkbox IE Fixes

## Bug Fixes

* Fixed IE  'prepend' error by adding global polyfill
* Fixed checkbox and radio elements behavior issues

# v2.57.1 - Dropzone Fixes

## Bug Fixes

* Fixed progress bar success color
* Fixed documentation errors

# v2.57.0 - File Uploader

## New Features

* Added file uploader implementation using DropzoneJS

# v2.56.1 - Dropdown Horizontal Scrollbar

## Bug Fixes

* Removed horizontal scrollbar on dropdowns

# v2.56.0 - Table Pagination Documentation

## Improvements

* Improved documentation for tables and pagination

# v2.55.0 - Daterange and Datepicker Improvements

## New Features

* Added basic Daterange functionality

## Improvements

* Updated Datepicker internals to use Bootstrap Datepicker (Tempus Dominus was a broken package)
* Added Z-Index attribute to custom element
* Added orientation attribute to custom element
* Added daterange attribute option to custom element

# v2.54.0 - Table Bulk Actions Styling

## Improvements

* Added outlines and padding to bulk actions in a backwards compatible way
* Switched to using em for button padding in case we move to text-size modifiers

## Bug Fixes

* Fixed height bug where heights on the container and `ul` tag did not match

# v2.53.2 - Left Nav Active State

## Bug Fixes

* Fixed issue where the top level navigation item in the left menu was not showing as active

# v2.53.1 - Pagination Cross-Browser Fixes

## Bug Fixes

* Fixes pagination display issues in various browsers

# v2.53.0 - Dropdown Improvements

## Improvements

* Removed unused multi-select-dropdown
* Refactored and restructured dropdown code
* Made type ahead dropdown's placeholder brighter
* Added truncation to the dropdown row's text
* Added ability to deselect single select back to default state
* Allow clicking on entire dropdown area to close dropdown after it's been opened in the same way

## Bug Fixes

* Fixed bug that prevented backspace from working
* Fixed single select not working when selecting using enter key

# v2.52.2 - Accordion Overflow Fixes

## Bug Fixes

* Fixed accordion bugs caused overflow problems
* Fixed margins, paddings, and alignment of various items
* Fixed interoperability issues between simple accordion and complex accordions

# v2.52.1 - Polyfill remove method for IE11

## Bug Fixes

* Fixes console errors thrown when trying to call `remove` in IE by adding polyfill

# v2.52.0 - Progress Bar Improvements

## Improvements

* Updated progress bar's animations
* Updated progress bar's documentation page
* Added multiple colors to progress bars
* Now allows multiple items
* Updated progress bar's colors' names to use domain names (danger, success, info, warning)
* Simplified API usage

# v2.51.8 - Dropdown And Input Field Alignment

## Bug Fixes

* Fixed various component heights to better alignment
* Fixed icon colors

# v2.51.7 - Modal Content Padding Fix

## Bug Fixes

* Fixes issue where the modal content fell underneath the modal header in certain situations

# v2.51.6 - Subnavigation Visibility Fix

## Bug Fixes

* Third level left navigation (and deeper) is now visible in expanded, collapsed and mobile menu versions

# v2.51.5 - Angular6 Base Path Fix

## Bug Fixes

* Fixed script paths by setting Angular 6 app base path relative to index file

# v2.51.4 - Demo Page JS Errors

## Bug Fixes

*  Fixed include path for RAUL JavaScript

# v2.51.3 - Left Nav Scroll Bugs

## Bug Fixes

* Fixed bug with left-nav showing horizontal scroll bar
* Fixed bug with left-nav bouncing vertical scroll bar
* Fixed scrollbar showing on hover when left nav is expanded

# v2.51.2 - Aside Modal Content Width Bug

## Bug Fixes

* Fixed an issue with the modal content collapsing it's width when content is not wide enough to fill

# v2.51.1 - Angular6 Examples

## Bug Fixes

* Fixed missing Angular6 files in deployed files

# v2.51.0 - Custom Element Slots Mixin

## Improvements

* Added notes and improved mixin for using slot-template for reactive frameworks
* Simplified Angular 6 implementation
* Moved Angular 6 build to styleguide
* Remove individual component builds and cleanup watchers
* Added multiple refs directives to clean up slot-template tags
* Added option to not auto select today for datepicker
* Added logic to cleanup slot-template tags

# v2.50.0 - Templated Card and Info Card

## New Features

* Added templated card component
* Added templated info card component

# v2.49.0 - Subhead Legibility

## Improvements

* Increase color contrast and weight of subhead text
  * Affects Accordions, Carousels, List Groups, and Highcharts

# v2.48.2 - Carousel Tile Sizing On Tiny Screens

## Bug Fixes

* Fixed tiles partially showing into view on tiny screen widths

# v2.48.1 - Dropdown, Highcharts, and Forms Bug Fixes

## Bug Fixes

* Reduced arrow sizes for better alignment with design comps
* Fixed mismatched dropdown and input heights
* Added inline dropdown with input example to the forms documentation
* Increased font sizes for HighCharts legend and title
* Fixed bug where dropdowns would break IE browsers
  * Added forEach polyfill for NodeList and HTMLCollection

# v2.48.0 - Table Filters And Bulk Actions

## New Features

* Added table filters
* Added Bulk Actions selection for table rows
* Added documentation examples using various filter types

## Bug Fixes

* Fixed issue with striped table hovers not working

# v2.47.0 - Roboto Font Weights

## Improvements

* Added additional font weights (thin, light, normal, black, italic) for Roboto font

# v2.46.2 - AO Product Icons

## Bug Fixes

* Added missing AO product icons css

# v2.46.1 - Gzipped major minor versions fix

## Bug Fixes

* Fixes issue with inconsistent gzipped encoding for major and minor release versions

# v2.46.0 - Single Datepicker Component

## New Features

* Added MomentJS library which is now globally available for teams
* Added single datepicker component using custom elements
  * Component extends Tempus Dominus a Bootstrap4/jQuery datepicker plugin
* Added documentation for basic, inline, and multiple options datepicker
* Added mixins to extend APIs

# v2.45.4 - Complex accordion subhead legibility fix

## Bug Fixes

* Darkened the accordion subhead text for better legibility on high contrast screens

# v2.45.3 - Gzip Assets and Add Documentation

## Bug Fixes

*  Fixed deployment script to properly upload Gzipped files
*  Added missing documentation to include gzipped info

# v2.45.2 - Gzip Release Fixes

## Bug Fixes

* Fixes errors with release process for compressed files

# v2.45.1 - Gzip Fix

## Bug Fixes

* Fixes styleguide target

# v2.45.0 - Gzipped Formats

## Improvements

* Added js and css gzipped formats

# v2.44.0 - Lodash Utility Library

## Improvements

* Added Lodash utility library and ability to pick out features as needed.

# v2.43.2 - Dropdown Type Restriction Error

## Bug Fixes

* Fixed error that treated every dropdown type as a single select internally, preventing close actions

# v2.43.1 - Deprecate Box Component

## Bug Fix

* Deprecated Box Component which does not match design's styleguide

# v2.43.0 - Dark Tabs

## Improvements

* Added dark-nav class to parent element in order to simplify usage
* Added examples for content tabs with light grey background

## Bug Fixes

* Fixed shell component main content animating when unnecessary

# v2.42.0 - Shell Feature Updates

## New Features

* Added ability to pass custom Unified Navbar items (icons in header) for special cases
  * Created ui-unified-navbar-item component
* Added option to hide left navigation entirely

## Improvements

* Added vertical centering of product name when company name and property name are excluded

# v2.41.0 - App Switcher Icons

## Improvements

* Mapped Design team's App Switcher icons based on data from Greenbook

# v2.40.3 - Accordion Item Styles

## Bug Fixes

* Fixed form elements breaking inside of accordion content

# v2.40.2 - Tooltip Documentation

## Bug fixes

* Fixed code highlight not showing markup language highlighting

# v2.40.1 - Nav Bar Border Consistency

## Bug Fixes

* Fixed nav bar tab height inconsistency to be the same height across all states

# v2.40.0 - Make UI Shell Composeable

## Improvements

* Separated shell components into separate custom elements, keeping the shell as simply a helper wrapper
* Added slot binding extension to be used as an alternative API for dynamic frameworks
* Added ability to dynamically load ignored tags
* Internalized left navigation theme toggling
* Added show/hide toggles for unified navbar links: help, home, and settings

# v2.39.3 - Page Header Print Fix

## Bug Fixes

* Fixed print issues with header, page header and notifications

# v2.39.2 - Typography Documentation

## Bug Fixes

* Fixed typography documentation bug, stating all "h tags" were `h1`

# v2.39.1 - Search Icon Text Overlap

## Bug Fixes

* Fixes search icon overlapping input text, and showing it underneath due to partial transparency
* Fixes mobile device inconsistences

# v2.39.0 - Dropdown Components

## New Features

* Created dropdown components based on Bootstrap's dropdown components
  * Created basic dropdown
  * Created select dropdown
  * Created multi-select dropdown
  * Includes typeahead feature
  * Included thematic examples for improved searching ability

# v2.38.3 - v-cloak Usage

## Bug Fixes

* Fixes v-cloak usage in styleguide

# v2.38.2 - Loading Flash

## Bug Fixes

* Added v-cloak to try and fix loading flash

# v2.38.1 - Angular examples fixes

## Bug fixes

* Fixed circular dependency issues with ui-checkbox
* Correctly wrapped angular v1 left nav

# v2.38.0 - AngularJs and Angular6 examples

## New Features

* Added AngularJS (Angular1) example
* Added Angular6 example (Angular 5 should be similar if not same)

## Improvements

* Top level Angular5/6 components can add `v-ng` attribute on element to allow Vue to automatically ignore these custom elements
* Provided left navigation slot for shell
* Added programatic API to initialize left navigation item toggles
* Added label property to ui-checkbox to allow passing in text if not using slot

# v2.37.2 - Dev Server Path

## Bug fixes

* Removed direct styleguide path when starting dev server
  * Using a direct path to styleguide creates relative path issues. In the future we plan to have an actual app control styleguide and the paths will be fixed internally. For now we just remove the dev server start.

# v2.37.1 - Unified Navbar Icon Classes

## Bug Fixes

* Renamed `icon-container` class to `unified-navbar-item` maintaining backwards compatibility
  * Fixes style collision issues when using icon libraries that target classes which start with or contain `icon-`

# v2.37.0 - Consistent Font Rendering

## Improvements

* Update font rendering to be consistent across various browsers

# v2.36.0 - Modal Height

## Improvements

* Removed modal content height lower limit, allowing it to be smaller than 300px

# v2.35.0 - Scroll Collapsed Top Level Menu

## Improvements

* Added a scroll functionality to left nav when it is collapsed and longer than the page height

# v2.34.0 - Shell Cleanup

## Improvements

* Added user initials into "more context" section
* Adjusted configuration to work well with new custom components
* Added ui-left-nav custom element that wraps left navigation content
* Created separate section for "more context" additional links due to technical limitations
* Updated vue-custom-element to 3.1.0 which includes the ability use template syntax
* Restructured vue component file organization
* Added ui-alerts custom-element skeleton
* Added ui-page-header custom element
* Wrapped styleguide page content within ui-shell custom element

# v2.33.0 - Table Updates

## Improvements

* Updated table styles
* Cleaned up action button style and functionality
* Changed main table selector to include .raul-table
* Added complex tables
* Updated striped table hovers

# v2.32.0 - Highcharts RAUL Plugin

## New Features

* Added Highcharts as a RAUL plugin
* Added Highcharts themes, and option extensions
* Added documentation with examples on usage ,and API
* Imported highcharts-more so that bubble type charts are available to use

# v2.31.1 - Styleguide Form Example Bug

## Bug Fixes

* Fixed to verify element presence before operating on it in the styleguide example

# v2.31.0 - Forms Documentation Updates

## Improvements

* Cleaned up forms documentation to be more sensible
* Renamed files and directories from form-inputs to forms
* Renamed "switcher" to "toggle" in order to avoid confusion with App Switcher
* Modified left aligned toggles to always be added before text
* Added basic form example
* Added, and temporarily hidden, a complex form example
* Removed deprecated element markup documentation
* Updated colors and margins for code snippets

# v2.30.0 - Vue Custom Element Addition

## Improvements

* Added an extension to Vue that allows further decoupling using Custom Elements
* Added ponyfill for IE browsers
* Refactored templated structure to use custom elements
* Added additional user links included by user into more context section
* Changed ui-shell attributes to no longer need to be bound
* Updated slot usage to use standard elements as containers, per custom elements limitations

# v2.29.3 - Shopping and Notifications Header Badges

## Bug Fixes

*  Fixed event binding API to follow the addEventListener pattern
*  Fixed badge counter data for notifications and shopping contexts
*  Fixed event handling to prevent default anchor actions when toggling content
*  Fixed shopping cart not passing custom markup down to more context

# v2.29.2 - Alert Icon Positioning Fix

## Bug Fixes

* Fixed positioning of alert component icon at all browser zoom levels
* Fixed notifications close button showing gray background in IE11

# v2.29.1 - Templated Header Links Fixes

## Bug Fixes

* Fixed custom links not being passed to rendered content

# v2.29.0 - Templated Header Cleanup

## Improvements

*  Users can now pass custom user links into the user dropdown menu
*  Additional custom links can now be used with user menu items

# v2.28.0 - Checkboxes, Radios, and Toggles

## Improvements

* Updated checkboxes, radio buttons, and toggles to be based off of Bootstrap library
* Updated radio and checkbox border to be blue on when active

## Bug Fixes

* Removed forced "On / Off" wording for toggles
* Removed forced margins

# v2.27.2 - Templated Shell Adjustments (#300)

## Bug Fixes

* Fixed summernote plugin toolbar overlapping shell components
* Updated legacy header code to query by IDs, avoiding conflicts with new code
* Fixed computed property for user initials
* Extracted header search into own component and store
* Added missing API hooks for tying into search component

# v2.27.1 - Select Element Caret Duplication

## Bug Fixes

* Fixed caret duplicating on select elements

# v2.27.0 - Templated Shell

## New Features

* Added VueJS framework to take advantage of reactive components and build templated system
  * Added build setup
  * Added VueX state store addition
  * Added collapse plugin
* Implemented templated infrastructure to be backwards compatible
* Implemented templated version of Shell Header
* Implemented templated version of App Switcher
* Updated initial load to not trigger animation on left navigation for templated version of Shell Header
* Adde UI Checkbox templated version as proof of concept of a basic component
* Added transition effects for use with templated components

## Improvements

* Added additional watch statements for builds
* Updated app switcher to query header element by class instead of ID
* Updated user handle element to be queried using class instead of ID

# v2.26.2 - Checkbox Label Alignment Fix

## Bug Fixes

* Adjusted positioning of checkboxes for better alignment with labels

# v2.26.1 - Plugin And Release Fixes

## Bug Fixes

* Fixed build paths for plugins
* Allow plugins to utilize extensions via subdirectories without forcing prefixes
* Cleaned up task runners by utilizing constants and methods
* Removed deprecated gulp-minify-css package and now using gulp-clean-css package to do same operation
* Added version-label utility to extract the label name for latest version in CHANGELOG.md
* Created release command and delegated versioning updates to release pushes
* Removed no longer used set-version command

# v2.26.0 - RAUL Plugins

## Improvements

* Added concept of plugins to RAUL
* Added summernote as an internal dependency and building it as a plugin
* Added summernote font dependencies
* Reintroduced package lock into version control to avoid dependency mismatches between builds
* Add plugin directory build tasks for JS and CSS
* Added notes about build process to better explain reasoning
* Set rollup default context to be the window object
* Move text-editor CSS and JS code into respective raul-plugin-summernote files
* Updated text editor plugin documentation

# v2.25.5 - Relative Image Paths Fixes

## Bug Fixes

* Updated missing relative image paths to point to images CDN using absolute paths

# v2.25.4 - Left Nav Trigger Event Binding Fix

## Bug Fixes

* Fixed left-nav trigger event binding to bind once without needing to remove events on every window resize

# v2.25.3 - Build Watch Styleguide Misspelling

## Bug fixes

* Fixed "styleguide" misspelling in build steps when watching for changes
  * Does not affect production code

# v2.25.2 - Polyfill And Annotation Build Fixes

## Bug Fixes

* Refactored build steps to make sure build is consistent
* Removed unused package gulp-concat-css
* Added versioning annotation as comments for JS and CSS builds at beginning of file
* Add full polyfill set using babel-polyfill

# v2.25.1 - Fix cut off header product name

## Bug Fixes

* Prevents font descenders from being cut off on product name in the RAUL header

# v2.25.0 - Carousel Refactor And Bug Fixes

## Improvements

* Refactored Carousel with updated ES6 syntax for easier maintenance and extensibility
* Vertically aligns content
* Refactored stylesheet to best utilize SCSS

## Bug Fixes

* Fixes various JS bugs dealing with sizing and sliding
* Fixes grid resizing bug
* Added limit to card description

# v2.24.0 - Form Element Validation

## Improvements

* Updated form element validation to match new design
* Used validation styles from Bootstrap 4

# v2.23.0 - Add Timeline Component

## New Feature

* Add Timeline Component

# v2.22.0 - Tab Hover Styles

## Improvements

* Added hover styles for tabs as defined by design team

# v2.21.4 - Left-Nav Sub Menu Visibility Bugs

* Added scrolling to sub nav if content overflows past visible areas when menu is collapsed

# v2.21.3 - Remove fancy deploy progress bar

## Bug Fixes

* Removed deploy progress bar in hopes it will not stall CI

# v2.21.2 - Upgrade AWS Deployment

## Bug Fixes

* Added callback for error event

# v2.21.1 - Upgrade AWS deployment

## Bug Fixes

* Adjust release script to run deploy script from travis instead of ruby script

# v2.21.0 - Upgrade AWS deployment

## Improvements

* Added deploy command for `raul` toolkit
* Updated release script to include new deploy steps

# v2.20.1 - Release Fix WIP

## Bug Fixes

* Try to fix bugs in deploy

# v2.20.0 - Enhance quality of instructions in styleguide

## Improvements

* Added more information for Loader component
* Cleaned up Alerts documentation
* Renamed `docs` directory to `introduction`
* Added `installation` how to information page
* Updated footer to include 'next' links for suggestions
* Ported index page content to appropriate pages
* Added utilities pages to describe available tools
  * Layout
  * XSS Filtering utility

## Bug Fixes

*  Updated content loader z-index to be lower than shell components

# v2.19.0 - Vertical Navigation Tabs

## New Features

* Added vertical navigation tabs which should be added to the left of content
  * Old vertical tabs were removed and displayed text updated

# v2.18.1 - Loader Page Fixes

## Bug Fixes

* Fixed issue where the page loader covered entire loader documentation page in the styleguide

# v2.18.0 - Static Image CDN

## Improvements

* Updated images to use static image CDN
  * Updated JavaScript, styles, and HTML image urls to point to CDN
  * Removed locally hosted images
  * Added image usage and dependency usage documentation pages
  * Removed FAQ and Issue Tracking pages that have been moved to the portal
  * Updated index page descriptions to reflect updates

# v2.17.0 - AppSwitcher and Tooling Improvements

## Improvements

* Refactor App Switcher as Component
  * Ported AppSwitcher to be entirely templated and controlled by JS
  * Updated AppSwitcher to utilize BS4 classes for fading elements
  * Update AppSwitcher to digest new API schema
  * Added documentation about app switcher use
* Added array utilities
  * Added code cleanup and organization for utility functions
* Update RAUL tooling
  * Added unit test runner for CI
  * Added `raul lint` command
  * Updated README.md describing new functionality

# v2.16.1 - Checkbox Component Styling Bug Fix

## Bug Fixes

* Fixes bug that appeared when removing the text inside the label of checkbox and radio buttons

# v2.16.0 - Action Menu Component

## New Feature

* Added acton menus that are opened by a kebob icon

# v2.15.5 - Left Nav Persistence

## Bug Fixes

* Fixes left navigation toggle persistance problems

# v2.15.4 - Aside Modal Footer Bug In IE11

## Bug Fixes

* Fixes Aside Modal Footer Bug In IE11, where the footer would stretch across entire screen

# v2.15.3 - Fixes: Loaders, App Switcher, Alert Docs

## Bug Fixes

* Fix page loader errors (#264)
* Fixed color and decoration for anchor tags inside more context list group
* Fixed error in alert docs
* Added fixes to app switcher (#263)
* Added product images
* Added documentation for adding close buttons to Modals
  * Close button is not added by default
* Fixed product name alignment to align vertically when product scopes are not supplied

# v2.15.2 - List Group Vertical Align

## Bug Fixes

* Fixes vertical alignment within list groups

# v2.15.1 - Fix SASS Compiler

## Bug Fixes

* Explicitly set node-sass to an older version to fix bugs introduced in new package versions

# v2.15.0 - Loader Component

## New Feature

* Added loader component
  * Page loader
  * Content loader

# v2.14.2 - CSS Image URLs, Progress Bar Corners, ASSET_BASE default

## Bug fixes

* Fixed directory for CSS image urls
* Fixed progress bar to not have rounded corners
* Set default asset base to empty string in order to match previous versions

# v2.14.1 - Fixes Styleguide Docs

## Bug Fixes

* Fixes incorrect styleguide doc text and expands on FAQ page

# v2.14.0 - Test Suite, IE11 ScrollBars, Accordion Icons

## Improvements

* Added initial e2e test suite using puppeteer
* Added unit test skeleton

## Bug Fixes

* Action icons for the Accordion component are now center aligned vertically
* Fixed IE11 scroll bars bug for left-nav component

# v2.13.6 - RAUL Zip, Polyfills, BS4 Stable Fixes

## Bug Fixes

*  Added polyfills and polyfilled Element.closest
*  Brought back dist zipping
*  Fixed syleguide to use stable version of BS4
*  Fixed modals to work with Bootstrap 4 stable and added documentation on modal closing options

# v2.13.5 - Header Bug Fixes And Alerts Clarification

## Bug Fixes

* Header product name and property name widths have been expanded
* User name is now vertically aligned when user title is not provided
* Alerts / Notifications have been fixed to have the required design
* Alerts / Notifications documentation has been corercted and cleaned up considerably

# v2.13.4 - Adds Text Editor Details

## Bug Fixes

* Added missing text area details
* Removed unwanted hr from alert on index

# v2.13.3 - Fixes Left Nav Media Size Toggles

## Bug Fixes

* Fixed uasage of media sizes for toggling left navigation

# v2.13.2 - Fixes Left Nav Selected Color

## Bug Fixes

* Fixed selected color on left navigation
  * NOTE: per design, selected color is not added to dark nav, as the dark nav has been deprecated

# v2.13.1 - Adds Missing Code Snippets And Dist Fix

## Bug Fixes

* Fixed dist directory to be streamlined and simpler to pull from
  * Image assets are combined into a single source
  * JS and CSS dist directories are now top level and break down components internally
  * Zip files are no longer supported, beyond vendors such as fonts
  * All individual demos are now part of the styleguide
* Added missing code snippets for all components
* Overrode various bootstrap styles to help interoperability
  * Theme colors
  * Buttons
  * Alerts
  * Badges
* Added various component fixes
  * Header: fixed avatar to account for whitespacing and multiple names
  * Buttons: removed underline on anchor buttons
  * Footer: added dynamic date for copyright
  * Messages: fixed messages to have an Alerts component variant & fixed buttons
  * Accordions: removed margin that should be set by user instead
  * Badges: removed padding that should be set by user instead & icon issues
  * Cards: removed excess styles & updated to use semantic markup
  * List Group: removed restricted widths
  * Status-Bar: removed restricted widths and margins

# v2.13.0 - Live Styleguide

## Improvements

* Added the first iteration of the live styleguide
  * All existing components are now in one place
  * Some components have markup examples (more to come soon)
  * We now have better visibility into how all components play together in the RAUL ecosystem

# v2.12.0 - System Improvements and Fixes

## Improvements

* Revamped file structure
* Restructured and cleaned up SCSS framework
* Added ability to write es6 code and compile down to iife build targets (browser compliant JS)
* Added git workflow diagram
* Updated GIT_WORKFLOW and README to add clarification

## Fixes

* Removed bootstrap helper classes from SCSS in favor of importing from local vendor package
* Cleaned up cobwebs in the tasks department
* Fixed linting errors and lack there of in CI

# v2.11.0 - Controlled Releases

## Improvements

* Added release branch to avoid changelog conflicts and allow fine grained release control

# v2.10.0 - Dynamic Versioning

## Improvements

* Version number is now automatically updated in the styleguide and package.json

# v2.9.10 - Deployment Automation

## Bug Fixes

* Added deploy cleanup phase to remove build artifacts from master

# v2.9.9 - Deployment Automation

## Bug Fixes

* Fixed push command for CI releases

# v2.9.8 - Deployment Automation

## Bug Fixes

* Tries to offload build artifacts to master branch

# v2.9.7 - Deployment Automation

## Bug Fixes

* Checkout master and tag branches inside deploy script

# v2.9.6 - Deployment Automation

## Bug Fixes

* Add the ability to create new tagged branches inside deploy script

# v2.9.5 - Deployment Automation

## Bug Fixes

* Through trial and error we should be able to keep our build artifacts

# v2.9.4 - Deployment Automation

## Bug Fixes

* Autodeploy will should keep build artifacts

# v2.9.3 - Deployment Automation

## Bug Fixes

* The need to commit build artifacts is gone :boom:
* Corrected inconsitencies in deploy script
* Every build now cleans/deletes all artifacts first to avoid stale files :sparkles:

# v2.9.2 - Add Deploy Script

## Bug Fixes

* Added deploy script for auto deployments
  * Uses CHANGELOG.md to determine tagging and change description

# v2.9.2-alpha-1 - Deploy test 1

## Bug Fixes

* Added a test deployment which apparently didn;t work well

# v2.9.1 - Fix broken demo

## Bug Fixes

* Fixes broken demo directory
