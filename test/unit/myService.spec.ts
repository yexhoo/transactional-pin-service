import MyService from '../../src/myService';
import {expect} from 'chai'
import 'mocha'

describe('My Serviece', ()=>{

    let myService:MyService;

    beforeEach(()=>{
        myService = new MyService()
    })

    it('should return true', ()=>{
        expect(myService.do()).to.equal(true)
    });
});