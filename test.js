const assets = [{"name":"Paint.Cross_1.0.0-rc.9_universal.dmg"}];
const dmg = assets.find(function(a) { return a.name.toLowerCase().endsWith('.dmg'); });
console.log(dmg);
