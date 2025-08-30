import * as vscode from 'vscode';

interface StreakData {
    count: number;
    lastTyped: number;
    isActive: boolean;
    charactersTyped: number;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Typing Streak extension is now active!');

    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right, 
        100
    );
    
    let streakData: StreakData = {
        count: 0,
        lastTyped: 0,
        isActive: false,
        charactersTyped: 0
    };

    let streakTimer: NodeJS.Timeout | undefined;
    let animationTimer: NodeJS.Timeout | undefined;

    // Animation states
    let animationFrame = 0;
    const fireEmojis = ['🔥', '🚀', '⚡', '💫', '✨'];
    const streakLevels = [
        { threshold: 10, emoji: '🔥', color: '#ff6b35' },
        { threshold: 25, emoji: '🚀', color: '#f7931e' },
        { threshold: 50, emoji: '⚡', color: '#ffcd3c' },
        { threshold: 100, emoji: '💫', color: '#4ecdc4' },
        { threshold: 200, emoji: '✨', color: '#45b7d1' }
    ];

    function updateStatusBar() {
        if (!vscode.workspace.getConfiguration('typingStreak').get('enabled')) {
            statusBarItem.hide();
            return;
        }

        if (streakData.count === 0) {
            statusBarItem.hide();
            return;
        }

        // Determine streak level
        const currentLevel = streakLevels
            .reverse()
            .find(level => streakData.count >= level.threshold) || streakLevels[0];
        
        // Create animated text
        let displayText = `${currentLevel.emoji} ${streakData.count}`;
        
        if (streakData.isActive && streakData.count > 5) {
            // Add pulsing effect for active streaks
            displayText += animationFrame % 2 === 0 ? ' ●' : ' ○';
        }

        statusBarItem.text = displayText;
        statusBarItem.tooltip = `Typing Streak: ${streakData.count} characters\nKeep typing to maintain your streak!`;
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        statusBarItem.show();
    }

    function startStreak() {
        streakData.isActive = true;
        
        // Start animation timer
        if (animationTimer) {
            clearInterval(animationTimer);
        }
        
        animationTimer = setInterval(() => {
            animationFrame++;
            updateStatusBar();
        }, 500); // Pulse every 500ms
    }

    function endStreak() {
        streakData.isActive = false;
        streakData.count = 0;
        streakData.charactersTyped = 0;
        
        if (animationTimer) {
            clearInterval(animationTimer);
            animationTimer = undefined;
        }
        
        // Show celebration message for good streaks
        if (streakData.count > 50) {
            vscode.window.showInformationMessage(
                `🎉 Great typing streak! You typed ${streakData.count} characters!`
            );
        }
        
        updateStatusBar();
    }

    function resetStreakTimer() {
        if (streakTimer) {
            clearTimeout(streakTimer);
        }
        
        // Reset streak after 3 seconds of inactivity
        streakTimer = setTimeout(() => {
            endStreak();
        }, 3000);
    }

    // Listen to text document changes
    const disposable = vscode.workspace.onDidChangeTextDocument((event) => {
        if (!vscode.workspace.getConfiguration('typingStreak').get('enabled')) {
            return;
        }

        // Only count actual typing (not programmatic changes)
        if (event.reason === vscode.TextDocumentChangeReason.Undo || 
            event.reason === vscode.TextDocumentChangeReason.Redo) {
            return;
        }

        const now = Date.now();
        const timeDiff = now - streakData.lastTyped;

        // Count characters added
        let charactersAdded = 0;
        event.contentChanges.forEach(change => {
            if (change.text.length > change.rangeLength) {
                charactersAdded += change.text.length - change.rangeLength;
            }
        });

        if (charactersAdded > 0) {
            streakData.lastTyped = now;
            streakData.count += charactersAdded;
            streakData.charactersTyped += charactersAdded;

            if (!streakData.isActive) {
                startStreak();
            }

            updateStatusBar();
            resetStreakTimer();
        }
    });

    // Toggle command
    const toggleCommand = vscode.commands.registerCommand('typingStreak.toggle', () => {
        const config = vscode.workspace.getConfiguration('typingStreak');
        const current = config.get('enabled');
        config.update('enabled', !current, vscode.ConfigurationTarget.Global);
        
        vscode.window.showInformationMessage(
            `Typing Streak ${!current ? 'enabled' : 'disabled'}!`
        );
    });

    // Configuration change listener
    const configListener = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('typingStreak')) {
            updateStatusBar();
        }
    });

    // Add to subscriptions
    context.subscriptions.push(
        disposable,
        toggleCommand,
        statusBarItem,
        configListener
    );

    // Initialize
    updateStatusBar();
}

export function deactivate() {
    // Cleanup handled by subscriptions
}
