<table>
  <tr>
    <td valign="center">
        <img align="center" src="https://whizzle.app/logo.svg" style="width: 60px"/>
    </td>
    <td valign="middle">
        <div>
            <h1>Whizzle</h1>
        </div>
    </td>
  </tr>
</table>

## Monorepo for Whizzle application

### Projects:

- [apps/api](apps/api): Main backend service
- [apps/web](apps/web): Main frontend app
- [packages/email-templates](packages/email-templates): Email templates
- [terraform](terraform): Infrastructure as code
- [docker](docker): Dockerfiles for development and production

## Technologies Used:

* Language: **Typescript**
* Framework: **Next.js, NestJS**
* Query builder: **Kysely**
* Migrations manager: **Prisma**
* Database: **Postgres**
* Queues/Jobs: **Bull/Redis**
* Package manager: **PNPM**
* Emails: **Resend**
* Error Reporting: **Sentry**
* Infrastructure: **Google Cloud, Terraform, Upstash**