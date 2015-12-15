import chai, {expect} from 'chai';

describe('Service', ()=> {
    describe('simple test', ()=> {
        function increment(a) {
            return a + 1;
        }

        it(' is a simple increment', () => {
            let a = 1;
            expect(increment(a)).to.equal(2);
        });
    });
});

