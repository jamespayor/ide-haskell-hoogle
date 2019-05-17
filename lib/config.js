"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    hoogleType: {
        order: 10,
        type: 'string',
        default: 'http://hoogle.haskell.org/',
        enum: [
            { value: '', description: 'Local hoogle. Will try to start Hoogle server from Path' },
            { value: 'http://hoogle.haskell.org/', description: 'Remote hoogle. Uses new http://hoogle.haskell.org/' },
            { value: 'https://haskell.org/hoogle/', description: 'Remote hoogle. Uses old https://haskell.org/hoogle/' },
        ],
    },
    webZoomFactor: {
        type: 'integer',
        description: 'Zoom factor for web view, in %',
        default: 100,
        minimum: 50,
        maximum: 300,
        order: 30,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRSxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsNEJBQTRCO1FBQ3JDLElBQUksRUFBRTtZQUNKLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUseURBQXlELEVBQUU7WUFDckYsRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLG9EQUFvRCxFQUFFO1lBQzFHLEVBQUUsS0FBSyxFQUFFLDZCQUE2QixFQUFFLFdBQVcsRUFBRSxxREFBcUQsRUFBRTtTQUM3RztLQUNGO0lBUUQsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLE9BQU8sRUFBRSxHQUFHO1FBQ1osT0FBTyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsR0FBRztRQUNaLEtBQUssRUFBRSxFQUFFO0tBQ1Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgaG9vZ2xlVHlwZToge1xuICAgIG9yZGVyOiAxMCxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnaHR0cDovL2hvb2dsZS5oYXNrZWxsLm9yZy8nLFxuICAgIGVudW06IFtcbiAgICAgIHsgdmFsdWU6ICcnLCBkZXNjcmlwdGlvbjogJ0xvY2FsIGhvb2dsZS4gV2lsbCB0cnkgdG8gc3RhcnQgSG9vZ2xlIHNlcnZlciBmcm9tIFBhdGgnIH0sXG4gICAgICB7IHZhbHVlOiAnaHR0cDovL2hvb2dsZS5oYXNrZWxsLm9yZy8nLCBkZXNjcmlwdGlvbjogJ1JlbW90ZSBob29nbGUuIFVzZXMgbmV3IGh0dHA6Ly9ob29nbGUuaGFza2VsbC5vcmcvJyB9LFxuICAgICAgeyB2YWx1ZTogJ2h0dHBzOi8vaGFza2VsbC5vcmcvaG9vZ2xlLycsIGRlc2NyaXB0aW9uOiAnUmVtb3RlIGhvb2dsZS4gVXNlcyBvbGQgaHR0cHM6Ly9oYXNrZWxsLm9yZy9ob29nbGUvJyB9LFxuICAgIF0sXG4gIH0sXG4gIC8vIFJlbW92ZWQsIGluIGZhdm9yIG9mIHVzaW5nIGBzdGFjayBob29nbGVgIGNvbnNpc3RlbnRseS5cbiAgLy8gaG9vZ2xlUGF0aDoge1xuICAvLyAgIHR5cGU6ICdzdHJpbmcnLFxuICAvLyAgIGRlZmF1bHQ6ICdob29nbGUnLFxuICAvLyAgIGRlc2NyaXB0aW9uOiAnUGF0aCB0byBob29nbGUgZXhlY3V0YWJsZScsXG4gIC8vICAgb3JkZXI6IDIwLFxuICAvLyB9LFxuICB3ZWJab29tRmFjdG9yOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlc2NyaXB0aW9uOiAnWm9vbSBmYWN0b3IgZm9yIHdlYiB2aWV3LCBpbiAlJyxcbiAgICBkZWZhdWx0OiAxMDAsXG4gICAgbWluaW11bTogNTAsXG4gICAgbWF4aW11bTogMzAwLFxuICAgIG9yZGVyOiAzMCxcbiAgfSxcbn1cbiJdfQ==