"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SelectListView = require("atom-select-list");
const etch = require("etch");
const util_1 = require("./util");
async function selectListView(items) {
    let panel;
    let res;
    let refocus;
    try {
        res = await new Promise((resolve) => {
            const select = new SelectListView({
                items,
                itemsClassList: ['ide-haskell'],
                elementForItem: (item) => etch.render(etch.dom("li", { class: "two-lines" },
                    etch.dom("span", { class: "primary-line", innerHTML: util_1.hl(item.signature || '', true) }),
                    etch.dom("span", { class: "secondary-line" }, item.mod || ''))),
                filterKeyForItem: (item) => item.signature,
                didCancelSelection: () => {
                    resolve();
                },
                didConfirmSelection: (item) => {
                    resolve(item);
                },
            });
            select.element.classList.add('ide-haskell');
            panel = atom.workspace.addModalPanel({
                item: select,
                visible: true,
            });
            if (document.activeElement instanceof HTMLElement) {
                refocus = document.activeElement;
            }
            select.focus();
        });
    }
    finally {
        panel && panel.destroy();
        refocus && refocus.focus();
    }
    return res;
}
exports.selectListView = selectListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpc3Qtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBbUQ7QUFFbkQsNkJBQTRCO0FBQzVCLGlDQUEyQjtBQUVwQixLQUFLLHlCQUNWLEtBQWdCO0lBRWhCLElBQUksS0FBaUQsQ0FBQTtJQUNyRCxJQUFJLEdBQXdCLENBQUE7SUFDNUIsSUFBSSxPQUFnQyxDQUFBO0lBQ3BDLElBQUk7UUFDRixHQUFHLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBc0IsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN2RCxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBVTtnQkFDekMsS0FBSztnQkFDTCxjQUFjLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQy9CLGNBQWMsRUFBRSxDQUFDLElBQWEsRUFBRSxFQUFFLENBQ2hDLElBQUksQ0FBQyxNQUFNLENBRVQsaUJBQUksS0FBSyxFQUFDLFdBQVc7b0JBQ25CLG1CQUFNLEtBQUssRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFFLFNBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBSTtvQkFDeEUsbUJBQU0sS0FBSyxFQUFDLGdCQUFnQixJQUFFLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFRLENBQ2pELENBRVM7Z0JBQ2xCLGdCQUFnQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUztnQkFDMUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO29CQUN2QixPQUFPLEVBQUUsQ0FBQTtnQkFDWCxDQUFDO2dCQUNELG1CQUFtQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDZixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQzNDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztnQkFDbkMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUE7WUFDRixJQUFJLFFBQVEsQ0FBQyxhQUFhLFlBQVksV0FBVyxFQUFFO2dCQUNqRCxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQTthQUNqQztZQUNELE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNoQixDQUFDLENBQUMsQ0FBQTtLQUNIO1lBQVM7UUFDUixLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDM0I7SUFDRCxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUM7QUEzQ0Qsd0NBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlbGVjdExpc3RWaWV3ID0gcmVxdWlyZSgnYXRvbS1zZWxlY3QtbGlzdCcpXG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBobCB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdExpc3RWaWV3KFxuICBpdGVtczogSVN5bWJvbFtdLFxuKTogUHJvbWlzZTxJU3ltYm9sIHwgdW5kZWZpbmVkPiB7XG4gIGxldCBwYW5lbDogUGFuZWw8U2VsZWN0TGlzdFZpZXc8SVN5bWJvbD4+IHwgdW5kZWZpbmVkXG4gIGxldCByZXM6IElTeW1ib2wgfCB1bmRlZmluZWRcbiAgbGV0IHJlZm9jdXM6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkXG4gIHRyeSB7XG4gICAgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8SVN5bWJvbCB8IHVuZGVmaW5lZD4oKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdCA9IG5ldyBTZWxlY3RMaXN0VmlldzxJU3ltYm9sPih7XG4gICAgICAgIGl0ZW1zLFxuICAgICAgICBpdGVtc0NsYXNzTGlzdDogWydpZGUtaGFza2VsbCddLFxuICAgICAgICBlbGVtZW50Rm9ySXRlbTogKGl0ZW06IElTeW1ib2wpID0+XG4gICAgICAgICAgZXRjaC5yZW5kZXIoXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby11bnNhZmUtYW55XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJ0d28tbGluZXNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmltYXJ5LWxpbmVcIiBpbm5lckhUTUw9e2hsKGl0ZW0uc2lnbmF0dXJlIHx8ICcnLCB0cnVlKX0gLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWNvbmRhcnktbGluZVwiPntpdGVtLm1vZCB8fCAnJ308L3NwYW4+XG4gICAgICAgICAgICA8L2xpPixcbiAgICAgICAgICAgIC8vIHRzbGludDplbmFibGU6bm8tdW5zYWZlLWFueVxuICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgIGZpbHRlcktleUZvckl0ZW06IChpdGVtKSA9PiBpdGVtLnNpZ25hdHVyZSxcbiAgICAgICAgZGlkQ2FuY2VsU2VsZWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0sXG4gICAgICAgIGRpZENvbmZpcm1TZWxlY3Rpb246IChpdGVtKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShpdGVtKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIHNlbGVjdC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lkZS1oYXNrZWxsJylcbiAgICAgIHBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7XG4gICAgICAgIGl0ZW06IHNlbGVjdCxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJlZm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICB9XG4gICAgICBzZWxlY3QuZm9jdXMoKVxuICAgIH0pXG4gIH0gZmluYWxseSB7XG4gICAgcGFuZWwgJiYgcGFuZWwuZGVzdHJveSgpXG4gICAgcmVmb2N1cyAmJiByZWZvY3VzLmZvY3VzKClcbiAgfVxuICByZXR1cm4gcmVzXG59XG4iXX0=