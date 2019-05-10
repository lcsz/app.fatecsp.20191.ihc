import { expect } from 'chai';
import 'mocha';
import { Serverlet } from './app';
import { Routing } from './core/routing';

class TestRoutes extends Routing {
    constructor() {
        super("test");
    }

    @Routing.Find("/")
    async status() {
        return "ok";
    }
}

const serverlet = new Serverlet().setup();
const app = serverlet.installRoutingProvider(new TestRoutes()).app;

describe('Test service', () => {
    const service = app.service('/test');
    
    it('should rerturn "ok"', () => {
        const name = "ok";
        service.find().then(result => {
            expect(result).to.be.equals(name);
        }).catch(error => {
            throw error;
        });
    });
});