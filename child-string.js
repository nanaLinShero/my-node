/**
 * 不同的子序列
 * 给定一个字符串s和一个字符串t，计算s的子序列中t出现的个数
 */
var s = 'rabbbit', t = 'rabbit'
var _s = s.split(''), _t = t.split('')

numDistinct(_s, _t)

function numDistinct(s, t) {
    console.log(s, t)
    if(!t || !t.length) {
        return 1
    }
    if(!s || !s.length) {
        return 0
    }
    if(s[0] == t[0]) {
        return numDistinct(s.slice(1), t.slice(1)) + numDistinct(s.slice(1), t)
    } else {
        return numDistinct(s.slice(1), t)
    }
}