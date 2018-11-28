/** 2018/1/26
* @author: kj
* @description:  单位换算
*/
define(function () {
    return UnitConvers;
});
var UnitConvers={
    watt:[$.getI18n('kWatt'),$.getI18n('mWatt'),$.getI18n('gWatt')],
    rmb:[$.getI18n('rmb'),$.getI18n('mRmb'),$.getI18n('bRmb')],
    kilowatt:[$.getI18n('kilowatt'),$.getI18n('mKilowatt'),$.getI18n('bKilowatt')],
    seat:[$.getI18n('seat'),$.getI18n('mSeat'),$.getI18n('bSeat')],
    area: [$.getI18n('area'),$.getI18n('mArea'), $.getI18n('bArea')],
    block: [$.getI18n('block'), $.getI18n('mBlock'), $.getI18n('bBlock')],
    platform: [$.getI18n('platform'), $.getI18n('mPlatform'), $.getI18n('bPlatform')],
    kg: [$.getI18n('kg'), $.getI18n('tKg'), $.getI18n('mKg'), $.getI18n('bKg')],
    tree: [$.getI18n('tree'),$.getI18n('mTree'), $.getI18n('bTree')],
};