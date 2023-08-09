export enum Status {
    FINISHED,
    STARTED,
    PLANNING,
    ACTIVE,
    TESTING
}

export enum LogStatus {
    WARNING,
    INFO,
    ERROR
}

export enum AlertSeverity {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
}

export enum Technology {
    C_SHARP = "C#",
    PYTHON = "Python",
    JAVA = "Java",
    REACT = "React",
    ANGULAR = "Angular",
    NODE_JS = "Node.js",
    SQL = "SQL",
    VUE = "Vue",
    DOT_NET = ".NET",
    C = "C",
    C_PLUS_PLUS = "C++",
    HTML_CSS = "HTML/CSS",
    JAVASCRIPT = "JavaScript",
    TYPESCRIPT = "TypeScript",
    PHP = "PHP",
    RUBY = "Ruby",
    SWIFT = "Swift",
    KOTLIN = "Kotlin",
    GO = "Go",
    RUST = "Rust",
    MATLAB = "MATLAB",
    PERL = "Perl",
    R = "R",
    SHELL_SCRIPTING = "Shell Scripting",
    AWS = "AWS",
    AZURE = "Azure",
    GCP = "GCP",
    DOCKER = "Docker",
    KUBERNETES = "Kubernetes",
    BLOCKCHAIN = "Blockchain",
    IOT = "IoT",
    MACHINE_LEARNING = "Machine Learning",
    ARTIFICIAL_INTELLIGENCE = "Artificial Intelligence",
    BIG_DATA = "Big Data",
    DEVOPS = "DevOps",
    UI_UX_DESIGN = "UI/UX Design",
    AGILE_METHODOLOGY = "Agile Methodology"
}

export const variantMap: Record<string, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline'> = {
    'h1': 'h1',
    'h2': 'h2',
    'h3': 'h3',
    'h4': 'h4',
    'h5': 'h5',
    'h6': 'h6',
    'subtitle1': 'subtitle1',
    'subtitle2': 'subtitle2',
    'body1': 'body1',
    'body2': 'body2',
    'button': 'button',
    'caption': 'caption',
    'overline': 'overline',
};