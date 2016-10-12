# stickityjs

Stickityjs is a small jQuery plugin. It makes one or more html elements sticky, if they reach the top of the page when the page is scrolling down.

## Usage
```javascript
$('.myStickyElements').stickity();
```
## Options

Stickity wraps all your sticky elements in a div. It also creates one separate div under the body-tag, that will be fixed positioned on the top of the page. A sticky element will be moved into it if it should get sticky. If you need your own classes for the elements wrapper and the sticky div, you can achieve this like follows.
```javascript
$('.myStickyElements').stickity({
  prefix: 'yourPrefix',
  stickityElementIdentifier: 'yourStickyElementClass',
  stickityContainerIdentifier: 'yourFixedContainerClass'
});
```
