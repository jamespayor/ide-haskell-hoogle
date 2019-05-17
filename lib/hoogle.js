"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const get = require("request-promise-native");
const CP = require("child_process");
const core_decorators_1 = require("core-decorators");
class Hoogle {
    constructor() {
        this.hoogleBaseUrl = 'http://hoogle.haskell.org/';
        this.attempts = 0;
        atom.config.observe('ide-haskell-hoogle.hoogleType', (val) => {
            if (val) {
                this.killProcess();
                this.hoogleBaseUrl = val;
            }
            else {
                this.spawnProcess();
                this.hoogleBaseUrl = `http://localhost:${this.port}/`;
            }
        });
    }
    async searchForSymbol(symbol) {
        const res = await get({
            uri: `${this.hoogleBaseUrl}?&hoogle=${symbol}&mode=json`,
            json: true,
        });
        if (Array.isArray(res)) {
            return Array.from(this.parseResults(res));
        }
        else {
            return Array.from(this.parseResults4(res.results));
        }
    }
    dispose() {
        this.killProcess();
    }
    *parseResults(results) {
        for (const r of results) {
            const div = document.createElement('div');
            div.innerHTML = r.item;
            const sig = div.innerText;
            yield {
                mod: r.module.name,
                signature: sig.replace('<0>', ''),
                href: r.url,
                doc: r.docs,
            };
        }
    }
    *parseResults4(results) {
        for (const r of results) {
            yield {
                mod: '',
                signature: r.self,
                href: r.location,
                doc: r.docs,
            };
        }
    }
    onProcessExit() {
        console.warn('ide-haskell-hoogle: hoogle has died. stderr:\n' + this.process.stderr.read());
        this.process.stderr.end();
        if (this.attempts > 10) {
            console.warn('ide-haskell-hoogle: hoogle has died 10 times. Will not try to restart.');
        }
        else {
            this.attempts += 1;
            console.warn('ide-haskell-hoogle: hoogle died -- will try to restart');
            window.setTimeout(() => this.spawnProcess(), this.attempts * 300);
        }
    }
    spawnProcess() {
        const projectPath = atom.project.rootDirectories && atom.project.rootDirectories[0].path;
        if (!projectPath) {
            console.warn('ide-haskell-hoogle: no global project; not starting hoogle');
            return;
        }
        console.log('ide-haskell-hoogle: starting hoogle for project "' + projectPath + '" at http://localhost:8080');
        this.port = 8080;
        this.process = CP.spawn('stack', ['hoogle', '--no-setup', '--server', '--', '--local'], {
            stdio: ['ignore', 'ignore', 'pipe'],
            cwd: projectPath,
            detached: false,
        });
        this.process.once('exit', this.onProcessExit);
    }
    killProcess() {
        if (this.process !== undefined) {
            console.warn('ide-haskell-hoogle: killing hoogle');
            this.process.removeAllListeners('exit');
            this.process.kill('SIGINT');
            this.process = undefined;
        }
    }
}
tslib_1.__decorate([
    core_decorators_1.autobind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Hoogle.prototype, "onProcessExit", null);
exports.Hoogle = Hoogle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBNkM7QUFDN0Msb0NBQW1DO0FBQ25DLHFEQUEwQztBQTJCMUM7SUFNRTtRQUZRLGtCQUFhLEdBQUcsNEJBQTRCLENBQUE7UUFHbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUNuRSxJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFBO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFBO2FBQ3REO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFjO1FBRXpDLE1BQU0sR0FBRyxHQUFtQixNQUFNLEdBQUcsQ0FBQztZQUNwQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxZQUFZLE1BQU0sWUFBWTtZQUN4RCxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQTtRQUVGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQzFDO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtTQUNuRDtJQUNILENBQUM7SUFFTSxPQUFP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QUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRXZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFBO1NBQ3pCO0lBQ0gsQ0FBQztDQUNGO0FBMUNDO0lBREMsMEJBQVE7Ozs7MkNBV1I7QUF6RUgsd0JBeUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZ2V0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZS1uYXRpdmUnXG5pbXBvcnQgKiBhcyBDUCBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICdjb3JlLWRlY29yYXRvcnMnXG5cbmludGVyZmFjZSBSZXNwb25zZUl0ZW0ge1xuICBkb2NzOiBzdHJpbmdcbiAgaXRlbTogc3RyaW5nXG4gIG1vZHVsZToge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHVybDogc3RyaW5nXG4gIH1cbiAgcGFja2FnZToge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHVybDogc3RyaW5nXG4gIH1cbiAgdHlwZTogc3RyaW5nXG4gIHVybDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBSZXNwb25zZUl0ZW00IHtcbiAgZG9jczogc3RyaW5nXG4gIGxvY2F0aW9uOiBzdHJpbmdcbiAgc2VsZjogc3RyaW5nXG59XG5cbnR5cGUgSG9vZ2xlUmVzcG9uc2UgPSBSZXNwb25zZUl0ZW1bXSB8IHtcbiAgcmVzdWx0czogUmVzcG9uc2VJdGVtNFtdXG59XG5cbmV4cG9ydCBjbGFzcyBIb29nbGUge1xuICBwcml2YXRlIGF0dGVtcHRzOiBudW1iZXJcbiAgcHJpdmF0ZSBwb3J0PzogbnVtYmVyXG4gIHByaXZhdGUgcHJvY2Vzcz86IENQLkNoaWxkUHJvY2Vzc1xuICBwcml2YXRlIGhvb2dsZUJhc2VVcmwgPSAnaHR0cDovL2hvb2dsZS5oYXNrZWxsLm9yZy8nXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDBcbiAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdpZGUtaGFza2VsbC1ob29nbGUuaG9vZ2xlVHlwZScsICh2YWw6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICB0aGlzLmtpbGxQcm9jZXNzKClcbiAgICAgICAgdGhpcy5ob29nbGVCYXNlVXJsID0gdmFsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNwYXduUHJvY2VzcygpXG4gICAgICAgIHRoaXMuaG9vZ2xlQmFzZVVybCA9IGBodHRwOi8vbG9jYWxob3N0OiR7dGhpcy5wb3J0fS9gXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZWFyY2hGb3JTeW1ib2woc3ltYm9sOiBzdHJpbmcpOiBQcm9taXNlPElTeW1ib2xbXT4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnNhZmUtYW55XG4gICAgY29uc3QgcmVzOiBIb29nbGVSZXNwb25zZSA9IGF3YWl0IGdldCh7XG4gICAgICB1cmk6IGAke3RoaXMuaG9vZ2xlQmFzZVVybH0/Jmhvb2dsZT0ke3N5bWJvbH0mbW9kZT1qc29uYCxcbiAgICAgIGpzb246IHRydWUsXG4gICAgfSlcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucGFyc2VSZXN1bHRzKHJlcykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucGFyc2VSZXN1bHRzNChyZXMucmVzdWx0cykpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5raWxsUHJvY2VzcygpXG4gIH1cblxuICBwcml2YXRlICpwYXJzZVJlc3VsdHMocmVzdWx0czogUmVzcG9uc2VJdGVtW10pIHtcbiAgICBmb3IgKGNvbnN0IHIgb2YgcmVzdWx0cykge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGRpdi5pbm5lckhUTUwgPSByLml0ZW1cbiAgICAgIGNvbnN0IHNpZyA9IGRpdi5pbm5lclRleHRcbiAgICAgIHlpZWxkIHtcbiAgICAgICAgbW9kOiByLm1vZHVsZS5uYW1lLFxuICAgICAgICBzaWduYXR1cmU6IHNpZy5yZXBsYWNlKCc8MD4nLCAnJyksXG4gICAgICAgIGhyZWY6IHIudXJsLFxuICAgICAgICBkb2M6IHIuZG9jcyxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlICpwYXJzZVJlc3VsdHM0KHJlc3VsdHM6IFJlc3BvbnNlSXRlbTRbXSkge1xuICAgIGZvciAoY29uc3QgciBvZiByZXN1bHRzKSB7XG4gICAgICB5aWVsZCB7XG4gICAgICAgIG1vZDogJycsXG4gICAgICAgIHNpZ25hdHVyZTogci5zZWxmLFxuICAgICAgICBocmVmOiByLmxvY2F0aW9uLFxuICAgICAgICBkb2M6IHIuZG9jcyxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgcHJpdmF0ZSBvblByb2Nlc3NFeGl0KCkge1xuICAgIGNvbnNvbGUud2FybignaWRlLWhhc2tlbGwtaG9vZ2xlOiBob29nbGUgaGFzIGRpZWQuIHN0ZGVycjpcXG4nICsgdGhpcy5wcm9jZXNzLnN0ZGVyci5yZWFkKCkpXG4gICAgdGhpcy5wcm9jZXNzLnN0ZGVyci5lbmQoKVxuICAgIGlmICh0aGlzLmF0dGVtcHRzID4gMTApIHtcbiAgICAgIGNvbnNvbGUud2FybignaWRlLWhhc2tlbGwtaG9vZ2xlOiBob29nbGUgaGFzIGRpZWQgMTAgdGltZXMuIFdpbGwgbm90IHRyeSB0byByZXN0YXJ0LicpIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLWNvbnNvbGVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdHRlbXB0cyArPSAxXG4gICAgICBjb25zb2xlLndhcm4oJ2lkZS1oYXNrZWxsLWhvb2dsZTogaG9vZ2xlIGRpZWQgLS0gd2lsbCB0cnkgdG8gcmVzdGFydCcpIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLWNvbnNvbGVcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuc3Bhd25Qcm9jZXNzKCksIHRoaXMuYXR0ZW1wdHMgKiAzMDApXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzcGF3blByb2Nlc3MoKSB7XG4gICAgY29uc3QgcHJvamVjdFBhdGggPSBhdG9tLnByb2plY3Qucm9vdERpcmVjdG9yaWVzICYmIGF0b20ucHJvamVjdC5yb290RGlyZWN0b3JpZXNbMF0ucGF0aFxuICAgIGlmICghcHJvamVjdFBhdGgpIHtcbiAgICAgIGNvbnNvbGUud2FybignaWRlLWhhc2tlbGwtaG9vZ2xlOiBubyBnbG9iYWwgcHJvamVjdDsgbm90IHN0YXJ0aW5nIGhvb2dsZScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc29sZS5sb2coJ2lkZS1oYXNrZWxsLWhvb2dsZTogc3RhcnRpbmcgaG9vZ2xlIGZvciBwcm9qZWN0IFwiJyArIHByb2plY3RQYXRoICsgJ1wiIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcpIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLWNvbnNvbGVcbiAgICAvLyBOb3RlOiBJZiB3ZSB3YW50IGhvb2dsZSB0byBiZSBhY2Nlc3NpYmxlIHRvIHRoZSB1c2VyLCB3ZSBzaG91bGQgdXNlIGEgc3RhbmRhcmQgbG9jYXRpb24uXG4gICAgdGhpcy5wb3J0ID0gODA4MCAvLyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNjAwMDAgLSAxMDAwMCkgKyAxMDAwMClcbiAgICB0aGlzLnByb2Nlc3MgPSBDUC5zcGF3bihcbiAgICAgICdzdGFjaycsXG4gICAgICBbJ2hvb2dsZScsICctLW5vLXNldHVwJywgJy0tc2VydmVyJywgJy0tJywgJy0tbG9jYWwnXSxcbiAgICAgIHtcbiAgICAgICAgc3RkaW86IFsnaWdub3JlJywgJ2lnbm9yZScsICdwaXBlJ10sXG4gICAgICAgIGN3ZDogcHJvamVjdFBhdGgsXG4gICAgICAgIGRldGFjaGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgKVxuICAgIHRoaXMucHJvY2Vzcy5vbmNlKCdleGl0JywgdGhpcy5vblByb2Nlc3NFeGl0KSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICB9XG5cbiAgcHJpdmF0ZSBraWxsUHJvY2VzcygpIHtcbiAgICBpZiAodGhpcy5wcm9jZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybignaWRlLWhhc2tlbGwtaG9vZ2xlOiBraWxsaW5nIGhvb2dsZScpIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLWNvbnNvbGVcbiAgICAgIHRoaXMucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2V4aXQnKVxuICAgICAgLy8gTm90ZSAoSmFtZXMpOiBXaGVuIHVzaW5nIGBzdGFjayBob29nbGVgLCBTSUdURVJNIGRvZXNuJ3QgYWN0dWFsbHkgdGVybWluYXRlIHRoZSB1bmRlcmx5aW5nIGhvb2dsZS4uLlxuICAgICAgdGhpcy5wcm9jZXNzLmtpbGwoJ1NJR0lOVCcpXG4gICAgICB0aGlzLnByb2Nlc3MgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn1cbiJdfQ==