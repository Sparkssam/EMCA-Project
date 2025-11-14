# Contributing to EMCA Project

Thank you for your interest in contributing to the EMCA Project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We're committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/EMCA-Project.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes: `pnpm dev`
6. Commit your changes: `git commit -m 'Add your feature'`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run linter
pnpm lint

# Build for production
pnpm build
```

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

## File Structure

- **Components**: `components/` - Organized by feature
- **Utilities**: `lib/` - Helper functions and utilities
- **Hooks**: `hooks/` - Custom React hooks
- **Pages**: `app/` - Next.js pages and layouts

## Pull Request Process

1. Ensure your code passes linting: `pnpm lint`
2. Update the README.md if needed
3. Add descriptive title and description to your PR
4. Reference any related issues
5. Wait for review and address feedback

## Reporting Issues

When reporting issues, please include:
- Description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details

## Questions?

Feel free to open an issue or discussion if you have questions about contributing.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
