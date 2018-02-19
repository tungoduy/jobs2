module.exports = function standartlizePhoneNumber(phone) {
    const _phone = String(phone).replace(/[^\d]/g, '');
    if (_phone.indexOf('972') === 0) {
        return '+' + _phone;
    } else if (_phone.indexOf('0') === 0) {
        return '+972' + _phone.substr(1);
    }

    return '+972' + _phone;
}