export default `
@font-face {
    font-family: "JY";
    src: url("JY.eot"); /* IE9 */
    src: url("JY.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    
    url(data:application/x-font-ttf;charset=utf-8;base64,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) format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
    
    url("JY.svg#JY") format("svg"); /* iOS 4.1- */
    font-style: normal;
    font-weight: normal;
}
`;